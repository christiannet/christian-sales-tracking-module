/**
 * @module server
 * @description Express application entry point. Initialises the database,
 *              registers global middleware, mounts the API router, and
 *              starts listening for incoming connections.
 */

import 'reflect-metadata';
import express from 'express';
import cors    from 'cors';
import { getDatabase } from '../infrastructure/database/Database';
import router          from './routes';

const app  = express();
const PORT = process.env.PORT ?? 3002;

// Initialise DB (creates tables + seeds demo data on first run)
getDatabase();

const allowedOrigins = (process.env.CORS_ORIGIN ?? 'http://localhost:4200')
  .split(',')
  .map(o => {
    const v = o.trim();
    return v.startsWith('http') ? v : `https://${v}`;
  });

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.use('/api', router);

app.listen(PORT, () => {
  console.log(`Sales Tracking API running on http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('  GET    /api/promoters');
  console.log('  POST   /api/sales');
  console.log('  GET    /api/sales/:userId');
  console.log('  GET    /api/progress/:userId');
});
