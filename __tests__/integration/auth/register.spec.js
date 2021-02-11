/* 
  @jest-environment node
*/
import { async } from 'regenerator-runtime';
import server from '../../../src/app';
import supertest from 'supertest';
import {connectDb, disconnectDb} from '../../server/utils/db';

const app = () => supertest(server);

describe('The registration process', () => {
  const url = '/api/v1/user/signup';

  const user = {
    email: 'test-register@yahoo.com',
    password: 'testing',
    first_name: 'registration',
    last_name: 'test',
    age: 15,
  };

  beforeAll(async() => {
    await connectDb();
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should register a new user', async() => {
    const response = await app().post(url).send(user);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'user successfully registered');
  });

  it('should return 400 for existing email', async() => {
    const response = await app().post(url).send(user);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'fail');
    expect(response.body).toHaveProperty('error', 'user with email test-register@yahoo.com already exist');
  })
})