import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export interface JwtPayload {
  userId: string;
  email: string;
}

const jwtSecret = env.jwtSecret || 'dev-secret';

export const signToken = (payload: JwtPayload) => {
  return jwt.sign(payload, jwtSecret, {
    // "7d", "1h", etc. → accepté au runtime par jsonwebtoken
    expiresIn: env.jwtExpiresIn as any,
  });
};

export const verifyToken = (token: string): JwtPayload => {
  return jwt.verify(token, jwtSecret) as JwtPayload;
};

// 🔽 Aliases pour compatibilité avec le reste du code
export const signJwt = signToken;
export const verifyJwt = verifyToken;
