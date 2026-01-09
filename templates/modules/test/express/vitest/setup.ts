import { vi, beforeAll } from 'vitest';
import express, { Express } from 'express';

// Mock database before importing any modules that might use it
vi.mock('../src/config/db.js', () => ({
  db: {},
}));

let app: Express;

beforeAll(async () => {
  // Create a fresh Express app for testing
  app = express();
  app.use(express.json());
  
  // Import and use the router
  try {
    const { router } = await import('../src/api/router.js');
    app.use('/api', router);
  } catch (error) {
    console.error('Failed to load router:', error);
  }
});

export { app };
