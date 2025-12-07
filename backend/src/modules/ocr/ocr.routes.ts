import { Router } from 'express';
import { ocrService } from './ocr.service';
import { AuthRequest } from '../../middlewares/auth';

export const ocrRouter = Router();

ocrRouter.post('/from-image', async (req: AuthRequest, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'file is required' });
  }
  const result = await ocrService.extractFromImage(req.file.buffer);
  res.json(result);
});
