import { Router } from 'express';
import { authService } from './auth.service';
import { LoginDto, SignupDto } from './auth.dto';

export const authRouter = Router();

authRouter.post('/signup', async (req, res) => {
  const body = req.body as SignupDto;
  const result = await authService.signup(body);
  res.json(result);
});

authRouter.post('/login', async (req, res) => {
  const body = req.body as LoginDto;
  const result = await authService.login(body);
  res.json(result);
});
