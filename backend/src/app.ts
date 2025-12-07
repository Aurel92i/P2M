import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import multer from 'multer';
import { json } from 'body-parser';
import { authRouter } from './modules/auth/auth.routes';
import { ocrRouter } from './modules/ocr/ocr.routes';
import { addressListRouter } from './modules/address-lists/address.routes';
import { requireAuth } from './middlewares/auth';

const upload = multer({ storage: multer.memoryStorage() });

export const app = express();

app.use(helmet());
app.use(cors());
app.use(json({ limit: '10mb' }));

app.use('/auth', authRouter);
app.use('/ocr', requireAuth, upload.single('file'), ocrRouter);
app.use('/address-lists', requireAuth, addressListRouter);

app.use((err: Error, _req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  res.status(500).json({ message: err.message || 'Unexpected server error' });
});
