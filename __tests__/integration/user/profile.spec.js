/* 
  @jest-environment node
*/
import server from '../../../src/app';
import { connectDb, disconnectDb } from '../../server/utils/db';
import supertest from 'supertest';

const app = () => supertest(server);

describe('user profile', () => {
  
  const user = {
    email: 'test-profile@yahoo.com',
    password: 'testing',
    first_name: 'profiletest',
    last_name: 'profile',
    age: 15,
  };

  let registeredUser;
  let token;

  beforeAll(async() => {
    await connectDb();
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should get profile of an authenticated user', async() => {
    //register a user
    await app().post('/api/v1/user/signup').send(user);
    //login the registered user
    registeredUser = await app().post('/api/v1/user/login').send({email: user.email, password: user.password});
    //set token
    token = registeredUser.body.data.token;

    //call get profile with auth token
    const headers = {
      authorization: `Bearer ${token}`
    };

    const response = await app().get('/api/v1/user/profile').set(headers);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('id');
    expect(response.body.data).toHaveProperty('userId');
    expect(response.body.data).toHaveProperty('first_name', 'profiletest')
    expect(response.body.data).toHaveProperty('last_name', 'profile')
    expect(response.body.data).toHaveProperty('age', 15)
    expect(response.body.data).toHaveProperty('Posts')
    expect(response.body.data.Posts).toEqual(expect.any(Array));
  });

  it('should return 400 for unauthorized request', async() => {
    const response = await app().get('/api/v1/user/profile');
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'fail');
    expect(response.body).toHaveProperty('error', 'Unauthorized request');
  });
});