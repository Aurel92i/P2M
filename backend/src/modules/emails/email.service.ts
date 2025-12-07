import nodemailer from 'nodemailer';
import { AddressList, Address, RouteEmailRecipient } from '@prisma/client';
import { env } from '../../config/env';

class EmailService {
  private transporter = nodemailer.createTransport(env.smtpUrl);

  async sendRouteEmail(list: AddressList & { addresses: Address[]; recipients?: RouteEmailRecipient[] }, recipients: string[]) {
    const ordered = [...list.addresses].sort((a, b) => a.orderIndex - b.orderIndex);
    const html = `
      <h3>${list.label}</h3>
      <p>Itinéraire généré automatiquement.</p>
      <ol>
        ${ordered
          .map(
            (addr) =>
              `<li><strong>${addr.formattedAddress}</strong><br/>Lat: ${addr.latitude ?? '-'} / Lng: ${addr.longitude ?? '-'}<br/>Commentaire: ${addr.comment ?? ''}</li>`
          )
          .join('')}
      </ol>
    `;

    await this.transporter.sendMail({
      from: env.emailFrom,
      to: recipients,
      subject: `Itinéraire ${list.label}`,
      html
    });
  }
}

export const emailService = new EmailService();
