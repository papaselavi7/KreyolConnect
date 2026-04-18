import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validate';
import { requireAuth, AuthRequest } from '../middleware/auth';
import { authLimiter } from '../middleware/rateLimit';

const router = Router();

// Zod Schemas
const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    full_name: z.string(),
    phone: z.string().optional(),
    preferred_language: z.enum(['ht', 'en']).default('ht')
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

// Routes
router.post('/register', authLimiter, validateRequest(registerSchema), (req, res) => {
  // TODO: Supabase Auth integration logic goes here
  res.status(201).json({ message_en: 'User registered', message_ht: 'Itilizatè a anrejistre' });
});

router.post('/login', authLimiter, validateRequest(loginSchema), (req, res) => {
  res.status(200).json({ token: 'mock-jwt-token-replace-with-real' });
});

router.post('/logout', requireAuth, (req, res) => {
  res.status(200).json({ message_en: 'Logged out successfully', message_ht: 'Ou dekonekte avek siksè' });
});

router.get('/me', requireAuth, (req: AuthRequest, res) => {
  res.status(200).json({ id: req.user?.id, email: req.user?.email });
});

export default router;
