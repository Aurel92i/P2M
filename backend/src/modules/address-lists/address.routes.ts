import { Router } from 'express';
import { AuthRequest } from '../../middlewares/auth';
import { addressListService } from './address.service';
import { CreateAddressListDto, OptimizeRouteDto, RecipientDto, UpdateAddressesDto } from './address.dto';
import { excelExporter } from '../emails/excel.service';
import { emailService } from '../emails/email.service';

export const addressListRouter = Router();

addressListRouter.post('/', async (req: AuthRequest, res) => {
  const body = req.body as CreateAddressListDto;
  const list = await addressListService.create(req.user!.id, body);
  res.status(201).json(list);
});

addressListRouter.get('/', async (req: AuthRequest, res) => {
  const lists = await addressListService.list(req.user!.id);
  res.json(lists);
});

addressListRouter.get('/:id', async (req: AuthRequest, res) => {
  const list = await addressListService.getById(req.user!.id, req.params.id);
  if (!list) return res.status(404).json({ message: 'Listing not found' });
  res.json(list);
});

addressListRouter.put('/:id/addresses', async (req: AuthRequest, res) => {
  const body = req.body as UpdateAddressesDto;
  const updated = await addressListService.updateAddresses(req.user!.id, req.params.id, body);
  res.json(updated);
});

addressListRouter.post('/:id/optimize-route', async (req: AuthRequest, res) => {
  const body = req.body as OptimizeRouteDto;
  const result = await addressListService.optimizeRoute(req.user!.id, req.params.id, body);
  res.json(result);
});

addressListRouter.get('/:id/export-excel', async (req: AuthRequest, res) => {
  const list = await addressListService.exportExcel(req.user!.id, req.params.id);
  const workbook = await excelExporter.exportList(list!);
  res.setHeader('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  res.setHeader('Content-Disposition', `attachment; filename=route-${req.params.id}.xlsx`);
  await workbook.xlsx.write(res);
  res.end();
});

addressListRouter.post('/:id/send-route-email', async (req: AuthRequest, res) => {
  const body = req.body as RecipientDto;
  const list = await addressListService.getById(req.user!.id, req.params.id);
  if (!list) return res.status(404).json({ message: 'Listing not found' });
  await addressListService.addRecipients(req.user!.id, req.params.id, body.recipients);
  await emailService.sendRouteEmail(list, body.recipients);
  res.json({ message: 'Emails sent' });
});
