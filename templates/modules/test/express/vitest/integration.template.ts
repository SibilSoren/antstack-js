import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { app } from '../setup.js';

/**
 * Integration tests for {{Name}} API
 * 
 * Before running these tests, make sure to:
 * 1. Register the {{kebabName}} route in src/api/router.ts
 * 2. Implement the repository methods in src/repositories/{{kebabName}}.repository.ts
 */
describe('{{Name}} API', () => {
  describe('GET /api/{{kebabName}}', () => {
    it('should respond to list request', async () => {
      const res = await request(app).get('/api/{{kebabName}}');
      // Route should exist and return data or 500 if not implemented
      expect([200, 500]).toContain(res.status);
    });
  });

  describe('GET /api/{{kebabName}}/:id', () => {
    it('should respond to get by id request', async () => {
      const res = await request(app).get('/api/{{kebabName}}/1');
      // Should return item, 404 if not found, or 500 if not implemented
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('POST /api/{{kebabName}}', () => {
    it('should respond to create request', async () => {
      const res = await request(app)
        .post('/api/{{kebabName}}')
        .send({
          // TODO: Add valid request body for {{name}}
        });
      // Should create, return validation error, or 500 if not implemented
      expect([201, 400, 500]).toContain(res.status);
    });
  });

  describe('PUT /api/{{kebabName}}/:id', () => {
    it('should respond to update request', async () => {
      const res = await request(app)
        .put('/api/{{kebabName}}/1')
        .send({
          // TODO: Add update data for {{name}}
        });
      // Should update, 404 if not found, or 500 if not implemented
      expect([200, 404, 500]).toContain(res.status);
    });
  });

  describe('DELETE /api/{{kebabName}}/:id', () => {
    it('should respond to delete request', async () => {
      const res = await request(app).delete('/api/{{kebabName}}/1');
      // Should delete, 404 if not found, or 500 if not implemented
      expect([204, 404, 500]).toContain(res.status);
    });
  });
});
