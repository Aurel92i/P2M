import { Router } from 'express';
import { authService } from './auth.service';
import { LoginDto, SignupDto, RegisterDto } from './auth.dto';
import { requireAuth, AuthRequest } from '../../middlewares/auth';

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  try {
    const body = req.body as SignupDto;
    const result = await authService.signup(body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Signup failed' });
  }
});

authRouter.post('/register', async (req, res) => {
  try {
    const body = req.body as RegisterDto;
    const result = await authService.register(body);
    res.json(result);
  } catch (error: any) {
    res.status(400).json({ message: error.message || 'Registration failed' });
  }
});

authRouter.post('/login', async (req, res) => {
  try {
    const body = req.body as LoginDto;
    const result = await authService.login(body);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Login failed' });
  }
});

authRouter.get('/me', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const user = await authService.getCurrentUser(userId);
    res.json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message || 'User not found' });
  }
});

authRouter.post('/refresh', requireAuth, async (req: AuthRequest, res) => {
  try {
    const userId = req.user!.id;
    const email = req.user!.email;
    const result = await authService.refreshToken(userId, email);
    res.json(result);
  } catch (error: any) {
    res.status(401).json({ message: error.message || 'Token refresh failed' });
  }
});
