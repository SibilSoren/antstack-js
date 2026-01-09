import { vi, beforeAll, afterAll } from 'vitest';
import Fastify, { FastifyInstance } from 'fastify';

// Mock database before importing any modules that might use it
vi.mock('../src/config/db.js', () => ({
  db: {},
}));

let app: FastifyInstance;

beforeAll(async () => {
  app = Fastify();
  
  // Import and use the router
  try {
    const { router } = await import('../src/api/router.js');
    await app.register(router, { prefix: '/api' });
  } catch (error) {
    console.error('Failed to load router:', error);
  }
  
  await app.ready();
});

afterAll(async () => {
  await app.close();
});

export { app };
