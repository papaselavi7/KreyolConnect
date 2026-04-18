import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { apiLimiter } from './middleware/rateLimit';

// Import Routers
import authRoutes from './routes/auth';
import statusRoutes from './routes/status';
import resourceRoutes from './routes/resources';
// Stubbed Routers for Phase 3 integration
const stubRouter = express.Router().all('*', (req, res) => res.status(501).json({ error: 'Not Implemented Yet' }));

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(apiLimiter);

// API Routing definitions
app.use('/api/auth', authRoutes);
app.use('/api/status', statusRoutes);
app.use('/api/resources', resourceRoutes);
app.use('/api/users', stubRouter);
app.use('/api/alerts', stubRouter);
app.use('/api/lawyers', stubRouter);
app.use('/api/remittance', stubRouter);
app.use('/api/guides', stubRouter);
app.use('/api/chat', stubRouter);
app.use('/api/subscriptions', stubRouter);
app.use('/api/admin', stubRouter);

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', service: 'KreyolConnect API - Phase 2 API Active' });
});

// Global Fallback Error Handler (Bilingual)
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('[API Error]:', err);
  const status = err.statusCode || 500;
  res.status(status).json({
    error_en: 'An unexpected server error occurred.',
    error_ht: 'Yon erè sanzatann afekte sèvè a.',
    details: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`[Backend] KreyolConnect API running on port ${PORT}`);
});
