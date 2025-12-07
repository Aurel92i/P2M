import fetch from 'node-fetch';
import { prisma } from '../../utils/prisma';
import { env } from '../../config/env';
import { CreateAddressListDto, OptimizeRouteDto, UpdateAddressesDto } from './address.dto';

interface GeocodeResult {
  formattedAddress: string;
  latitude?: number;
  longitude?: number;
}

export class AddressListService {
  async create(userId: string, dto: CreateAddressListDto) {
    const geocoded = await Promise.all(dto.addresses.map((a) => this.geocode(a)));
    const created = await prisma.addressList.create({
      data: {
        userId,
        label: dto.label,
        startingNote: dto.startingNote,
        addresses: {
          create: geocoded.map((addr, idx) => ({
            rawText: dto.addresses[idx],
            formattedAddress: addr.formattedAddress,
            latitude: addr.latitude,
            longitude: addr.longitude,
            orderIndex: idx
          }))
        }
      },
      include: { addresses: true }
    });
    return created;
  }

  async list(userId: string) {
    return prisma.addressList.findMany({ where: { userId }, include: { addresses: true, recipients: true } });
  }

  async getById(userId: string, id: string) {
    return prisma.addressList.findFirst({ where: { id, userId }, include: { addresses: true, recipients: true } });
  }

  async updateAddresses(userId: string, id: string, dto: UpdateAddressesDto) {
    const list = await this.getById(userId, id);
    if (!list) throw new Error('Listing not found');

    const updatePromises = dto.addresses.map((addr) =>
      prisma.address.update({
        where: { id: addr.id },
        data: { formattedAddress: addr.formattedAddress, comment: addr.comment, orderIndex: addr.orderIndex }
      })
    );
    await Promise.all(updatePromises);
    return this.getById(userId, id);
  }

  async optimizeRoute(userId: string, id: string, dto: OptimizeRouteDto) {
    const list = await this.getById(userId, id);
    if (!list) throw new Error('Listing not found');

    const points = list.addresses.map((a) => ({ id: a.id, lat: a.latitude, lng: a.longitude }));
    const ordered = this.nearestNeighbor(dto.startLat, dto.startLng, points);
    await Promise.all(
      ordered.map((addrId, idx) => prisma.address.update({ where: { id: addrId }, data: { orderIndex: idx } }))
    );
    const orderedAddresses = await prisma.address.findMany({ where: { addressListId: id }, orderBy: { orderIndex: 'asc' } });
    const googleMapsUrl = this.buildGoogleMapsUrl(dto.startLat, dto.startLng, orderedAddresses);
    return { addresses: orderedAddresses, googleMapsUrl };
  }

  async addRecipients(userId: string, id: string, recipients: string[]) {
    const list = await this.getById(userId, id);
    if (!list) throw new Error('Listing not found');
    await prisma.routeEmailRecipient.deleteMany({ where: { addressListId: id } });
    await prisma.routeEmailRecipient.createMany({ data: recipients.map((email) => ({ email, addressListId: id })) });
    return this.getById(userId, id);
  }

  async exportExcel(userId: string, id: string) {
    const list = await this.getById(userId, id);
    if (!list) throw new Error('Listing not found');
    return list;
  }

  private async geocode(address: string): Promise<GeocodeResult> {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${env.googleMapsKey}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Geocoding failed');
    const data = (await res.json()) as any;
    const result = data.results?.[0];
    return {
      formattedAddress: result?.formatted_address || address,
      latitude: result?.geometry?.location?.lat,
      longitude: result?.geometry?.location?.lng
    };
  }

  private nearestNeighbor(startLat: number, startLng: number, points: { id: string; lat: number | null; lng: number | null }[]) {
    const remaining = [...points];
    const ordered: string[] = [];
    let currentLat = startLat;
    let currentLng = startLng;
    while (remaining.length > 0) {
      remaining.sort((a, b) => this.distance(currentLat, currentLng, a.lat, a.lng) - this.distance(currentLat, currentLng, b.lat, b.lng));
      const next = remaining.shift();
      if (!next) break;
      ordered.push(next.id);
      currentLat = next.lat || currentLat;
      currentLng = next.lng || currentLng;
    }
    return ordered;
  }

  private distance(lat1?: number | null, lng1?: number | null, lat2?: number | null, lng2?: number | null) {
    if (lat1 == null || lng1 == null || lat2 == null || lng2 == null) return Number.MAX_VALUE / 2;
    const toRad = (value: number) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lng2 - lng1);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  private buildGoogleMapsUrl(startLat: number, startLng: number, addresses: { latitude: number | null; longitude: number | null }[]) {
    const waypoints = addresses
      .map((a) => (a.latitude && a.longitude ? `${a.latitude},${a.longitude}` : null))
      .filter(Boolean)
      .join('|');
    return `https://www.google.com/maps/dir/${startLat},${startLng}/${waypoints}`;
  }
}

export const addressListService = new AddressListService();
