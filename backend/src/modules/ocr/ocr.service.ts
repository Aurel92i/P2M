import fetch from 'node-fetch';
import { env } from '../../config/env';

export interface OcrResult {
  rawText: string;
  addresses: string[];
}

export class OcrService {
  async extractFromImage(buffer: Buffer): Promise<OcrResult> {
    // TODO: inject Google Cloud Vision credentials via env.googleVisionKey
    const requestBody = {
      requests: [
        {
          image: { content: buffer.toString('base64') },
          features: [{ type: 'DOCUMENT_TEXT_DETECTION' }]
        }
      ]
    };

    const response = await fetch('https://vision.googleapis.com/v1/images:annotate?key=' + env.googleVisionKey, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    if (!response.ok) {
      throw new Error('Vision API error');
    }
    const data = (await response.json()) as any;
    const rawText = data.responses?.[0]?.fullTextAnnotation?.text || '';
    const addresses = rawText
      .split('\n')
      .map((line: string) => line.trim())
      .filter((line: string) => line.length > 5);

    return { rawText, addresses };
  }
}

export const ocrService = new OcrService();
