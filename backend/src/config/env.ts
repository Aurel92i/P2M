import dotenv from 'dotenv';

dotenv.config();

export const env = {
PORT=4000
JWT_SECRET=dev-secret
JWT_EXPIRES_IN=7d

GOOGLE_MAPS_KEY=AIzaSyCImYRBo4fWWQIOPhrxV14ExRmJBO9p
GOOGLE_VISION_KEY=AIzaSyCImYRBo4fWWQIOPhrxV14ExRmJBO9p

EMAIL_FROM=no-reply@example.com
SMTP_URL=smtp://user:pass@mail.example.com

};
