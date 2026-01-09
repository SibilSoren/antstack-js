import { vi, beforeAll } from 'vitest';
import { Hono } from 'hono';

// Mock database before importing any modules that might use it
vi.mock('../src/config/db.js', () => ({
  db: {},
}));

const app = new Hono();

beforeAll(async () => {
  // Import and use the router
  try {
    const { router } = await import('../src/api/router.js');
    app.route('/api', router);
  } catch (error) {
    console.error('Failed to load router:', error);
  }
});

export { app };
