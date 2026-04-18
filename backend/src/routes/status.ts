import { Router } from 'express';
import { z } from 'zod';
import { validateRequest } from '../middleware/validate';
import { requireAuth, AuthRequest } from '../middleware/auth';

const router = Router();

const statusSchema = z.object({
  body: z.object({
    status_type: z.enum(['TPS', 'DACA', 'EAD', 'I-94', 'asylum']),
    document_number: z.string().optional(),
    issue_date: z.string().datetime().optional(),
    expiry_date: z.string().datetime().optional(),
    renewal_reminder_days: z.number().default(90)
  }),
});

router.get('/', requireAuth, (req: AuthRequest, res) => {
  res.status(200).json({ data: [] }); // TODO: Prisma query
});

router.post('/', requireAuth, validateRequest(statusSchema), (req: AuthRequest, res) => {
  res.status(201).json({ 
    message_en: 'Status record added', 
    message_ht: 'Dosye estati a ajoute',
    data: req.body 
  });
});

router.get('/upcoming', requireAuth, (req: AuthRequest, res) => {
  // Logic to find dates expiring < 90 days
  res.status(200).json({ upcoming_expirations: [] });
});

export default router;
