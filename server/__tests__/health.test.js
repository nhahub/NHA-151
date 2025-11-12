const request = require('supertest');
// Ensure we don't attempt a DB connect during this test run
process.env.SKIP_DB = 'true';

const app = require('../index');

describe('Health endpoints', () => {
  test('GET /api/health returns status ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ok');
    expect(res.body).toHaveProperty('uptime');
  });

  test('GET /api/health/ready returns status ready', async () => {
    const res = await request(app).get('/api/health/ready');
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'ready');
  });
});
