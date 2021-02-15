/* 
  @jest-environment node
*/
import { User } from '../../../src/database/models';
import { connectDb, disconnectDb } from '../../server/utils/db';
import server from '../../../src/app';
import supertest from 'supertest';

const app = () => supertest(server);

describe('create post process', () => {

  const user = {
    email: 'test-create_post@yahoo.com',
    password: 'testing',
    first_name: 'create',
    last_name: 'post',
    age: 15
  };

  let token;

  beforeAll(async() => {
    await connectDb();
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should create a post', async() => {
    await app().post('/api/v1/user/signup').send(user);

    const login = await app().post('/api/v1/user/login').send({ email: user.email, password: user.password});
    token = login.body.data.token;

    const headers = {
      authorization: `Bearer ${token}`
    };

    const post = {
      title: 'test post',
      content: 'This is a test post!'
    };

    const response = await app().post('/api/v1/posts/create').send(post).set(headers);

    expect(response.status).toBe(201);
    
  })
})