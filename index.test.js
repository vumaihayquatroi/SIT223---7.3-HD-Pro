const request = require('supertest');
const { app, server } = require('./index');

describe('GET /', () => {
  it('responds with Hello message', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('Hello, DevOps Pipeline is running!');
  });
});

describe('GET /health', () => {
  it('responds with status UP', async () => {
    const response = await request(app).get('/health');
    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('UP');
  });
});

afterAll(done => {
  if (server) {
    server.close(done);
  } else {
    done();
  }
});