import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT ?? '4000',
  jwtSecret: process.env.JWT_SECRET ?? 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '30d',
  googleVisionKey: process.env.GOOGLE_VISION_KEY ?? '',
  googleMapsKey: process.env.GOOGLE_MAPS_KEY ?? '',
  emailFrom: process.env.EMAIL_FROM ?? '',
  smtpUrl: process.env.SMTP_URL ?? '',
};
