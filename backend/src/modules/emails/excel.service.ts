import ExcelJS from 'exceljs';
import { AddressList, Address } from '@prisma/client';

class ExcelExporter {
  async exportList(list: AddressList & { addresses: Address[] }) {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet('Route');
    sheet.columns = [
      { header: '#', key: 'orderIndex', width: 6 },
      { header: 'Adresse', key: 'address', width: 50 },
      { header: 'Latitude', key: 'lat', width: 12 },
      { header: 'Longitude', key: 'lng', width: 12 },
      { header: 'Commentaire', key: 'comment', width: 40 }
    ];
    list.addresses
      .sort((a, b) => a.orderIndex - b.orderIndex)
      .forEach((addr, idx) => {
        sheet.addRow({
          orderIndex: idx + 1,
          address: addr.formattedAddress,
          lat: addr.latitude,
          lng: addr.longitude,
          comment: addr.comment
        });
      });
    return workbook;
  }
}

export const excelExporter = new ExcelExporter();
