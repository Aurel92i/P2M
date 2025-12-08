import dotenv from 'dotenv';

dotenv.config();

// Validate JWT_SECRET in production
const isProduction = process.env.NODE_ENV === 'production';
const jwtSecret = process.env.JWT_SECRET ?? 'dev-secret';

if (isProduction && jwtSecret === 'dev-secret') {
  console.error('CRITICAL: JWT_SECRET is not set in production! Authentication is insecure!');
  console.error('Set JWT_SECRET environment variable to a strong random string.');
}

if (!process.env.JWT_SECRET) {
  console.warn('WARNING: JWT_SECRET not set, using default dev-secret. Do NOT use in production!');
}

export const env = {
  port: process.env.PORT ?? '4000',
  jwtSecret,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN ?? '7d',
  googleVisionKey: process.env.GOOGLE_VISION_KEY ?? '',
  googleMapsKey: process.env.GOOGLE_MAPS_KEY ?? '',
  emailFrom: process.env.EMAIL_FROM ?? '',
  smtpUrl: process.env.SMTP_URL ?? '',
};
