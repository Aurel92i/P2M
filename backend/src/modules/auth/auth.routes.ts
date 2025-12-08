import { Router } from 'express';
import { authService } from './auth.service';
import { LoginDto, SignupDto, RegisterDto } from './auth.dto';

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
