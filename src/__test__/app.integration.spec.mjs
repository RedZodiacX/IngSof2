import supertest from 'supertest';
import {
  describe, jest, expect, beforeEach, afterEach, test,
} from '@jest/globals';

import app from '../../app.mjs';
import { starConnection, closeConnection } from '../mongoo/index.mjs';

beforeEach(async () => {
  await starConnection();
});

afterEach(async () => {
  await closeConnection();
});

describe('Test app Express server', () => {
  test("Test Get / should return 'ok'", async () => {
    const response = await supertest(app).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('ok');
  });
  test('Post /images should return 200 status', async () => {
    const response = (await supertest(app).post('/images'))
      .set('Content-Type', 'multipart/form-data')
      .field('filters[]', 'greyscale')
      .field('filters[]', 'blur')
      .attach('images[]', 'src/__test__/assets/img.jpeg');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('filters');
    expect(response.body).toHaveProperty('_id');
    expect(response.body).toHaveProperty('createAt');
    expect(response.body).toHaveProperty('updateAt');
  });
  test('Post', async () => {
    const response = await supertest(app).post('/images')
      .set('Content-Type', 'multipart/form-data')
      .field('filters[]', 'greyscale');

    expect(response.status).toBe(200);
  });
});
