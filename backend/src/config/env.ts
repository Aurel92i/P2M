import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: process.env.PORT || '4000',
  jwtSecret: process.env.JWT_SECRET || 'dev-secret',
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  googleVisionKey: process.env.GOOGLE_VISION_KEY || 'TODO_SET_GOOGLE_KEY',
  googleMapsKey: process.env.GOOGLE_MAPS_KEY || 'TODO_SET_GOOGLE_MAPS_KEY',
  emailFrom: process.env.EMAIL_FROM || 'no-reply@example.com',
  smtpUrl: process.env.SMTP_URL || 'smtp://user:pass@mail.example.com'
};
