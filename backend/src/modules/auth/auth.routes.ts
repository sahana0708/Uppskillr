import { Router, Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import { authService } from './auth.service';
import { registerSchema, loginSchema } from './auth.schema';

const router = Router();

// POST /api/auth/register
router.post(
  '/register',
  asyncHandler(async (req: Request, res: Response) => {
    const validatedData = registerSchema.parse(req.body);
    const user = await authService.register(validatedData as any);
    res.status(201).json({ message: 'User registered successfully', user });
  })
);

// POST /api/auth/login
router.post(
  '/login',
  asyncHandler(async (req: Request, res: Response) => {
    const validatedData = loginSchema.parse(req.body);
    const result = await authService.login(validatedData as any);

    // Set refresh token in HTTP-only cookie
    res.cookie('refreshToken', result.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });

    res.json({
      message: 'Login successful',
      accessToken: result.accessToken,
      user: result.user,
    });
  })
);

// POST /api/auth/logout
router.post(
  '/logout',
  asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      await authService.logout(refreshToken);
      res.clearCookie('refreshToken');
    }

    res.json({ message: 'Logout successful' });
  })
);

// POST /api/auth/refresh
router.post(
  '/refresh',
  asyncHandler(async (req: Request, res: Response) => {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken) {
      res.status(401).json({ message: 'No refresh token provided' });
      return;
    }

    const result = await authService.refreshAccessToken(refreshToken);
    res.json(result);
  })
);

export default router;
