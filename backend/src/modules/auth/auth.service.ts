import bcrypt from 'bcrypt';
import { prisma } from '../../utils/prisma';
import { signToken } from '../../utils/jwt';
import { LoginDto, SignupDto } from './auth.dto';

export class AuthService {
  async signup(data: SignupDto) {
    const existing = await prisma.user.findUnique({ where: { email: data.email } });
    if (existing) {
      throw new Error('Email already registered');
    }
    const passwordHash = await bcrypt.hash(data.password, 10);
    const user = await prisma.user.create({ data: { email: data.email, passwordHash } });
    const token = signToken({ userId: user.id, email: user.email });
    return { token };
  }

  async login(data: LoginDto) {
    const user = await prisma.user.findUnique({ where: { email: data.email } });
    if (!user) {
      throw new Error('Invalid credentials');
    }
    const valid = await bcrypt.compare(data.password, user.passwordHash);
    if (!valid) {
      throw new Error('Invalid credentials');
    }
    const token = signToken({ userId: user.id, email: user.email });
    return { token };
  }
}

export const authService = new AuthService();
