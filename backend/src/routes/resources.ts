import { Router } from 'express';
import { requireAuth, requireAdmin } from '../middleware/auth';
import { apiLimiter } from '../middleware/rateLimit';

const router = Router();

// Publicly readable directory
router.get('/', apiLimiter, (req, res) => {
  const { category, state, city, is_free, language } = req.query;
  // TODO: Implement complex prisma filter logic
  res.status(200).json({ data: [] });
});

router.get('/nearby', apiLimiter, (req, res) => {
  const { lat, lng } = req.query;
  // Haversine formula logic or PostGIS implementation
  res.status(200).json({ data: [] });
});

router.get('/:id', apiLimiter, (req, res) => {
  res.status(200).json({ id: req.params.id }); 
});

// Admin-only mutations
router.post('/', requireAuth, requireAdmin, (req, res) => {
  res.status(201).json({ message_en: 'Resource created', message_ht: 'Resous kreye' });
});

export default router;
