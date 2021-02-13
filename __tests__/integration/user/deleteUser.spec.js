/* 
  @jest-environment node
*/
import { async } from 'regenerator-runtime';
import { User } from '../../../src/database/models';
import { connectDb, disconnectDb } from '../../server/utils/db';
import server from '../../../src/app';
import supertest from 'supertest';

const app = () => supertest(server);

describe('The delete user', () => {

  const user = {
    email: 'test-deleteUser@yahoo.com',
    password: 'testing',
    first_name: 'delete',
    last_name: 'user',
    age: 15
  };

  let registeredUser;
  let token;

  beforeAll(async() => {
    await connectDb();
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should delete a registered user with userId from token', async() => {

    registeredUser = await User.create(user);
    const login = await app().post('/api/v1/user/login').send({email: user.email, password: user.password});
    token = login.body.data.token;

    const headers = {
      authorization: `Bearer ${token}`
    };
    
    const response = await app().delete('/api/v1/user/delete').set(headers);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'user successfully deleted');

  });

  it('should return 401 if unsigned token is sent', async() => {

    const headers = {
      authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5dDI6IkpXVCJ9.eyJpc3MiOiJvbW9kYXVkYSIsInN1YiI6IjI0NTlhZjg1LTA4M2YtNGE0YS1iNmFmLWRlZThlNzFiZTIwNCIsImlhdCI6MTYxMzI0MTg5NTUwMCwiZXhwaXJlc0luIjoiN2QifQ.ZjA7QHkC4MDEQLfyqcGC3twIkhxbAlA6rtfdec54ce`
    };

    const response = await app().delete('/api/v1/user/delete').set(headers);
    
    expect(response.status).toBe(401);
    expect(response.body).toHaveProperty('status', 'fail');
    expect(response.body).toHaveProperty('error', 'Unauthorized request');
  })
})