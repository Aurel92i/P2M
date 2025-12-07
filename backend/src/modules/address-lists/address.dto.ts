export interface CreateAddressListDto {
  label: string;
  addresses: string[];
  startingNote?: string;
}

export interface UpdateAddressesDto {
  addresses: Array<{
    id: string;
    formattedAddress: string;
    comment?: string;
    orderIndex?: number;
  }>;
}

export interface OptimizeRouteDto {
  startLat: number;
  startLng: number;
}

export interface RecipientDto {
  recipients: string[];
}
