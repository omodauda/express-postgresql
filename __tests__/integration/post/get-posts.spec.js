/* 
  @jest-environment node
*/
import server from '../../../src/app';
import supertest from 'supertest';
import { connectDb, disconnectDb } from '../../server/utils/db';
import { Post } from '../../../src/database/models';

const app = () => supertest(server);

describe('get all posts', () => {

  const user = {
    email: 'test-get-posts@yahoo.com',
    password: 'testing',
    first_name: 'get',
    last_name: 'posts',
    age: 15
  };

  let token;
  let userProfileId;

  beforeAll(async() => {
    await connectDb();

  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should get all posts for an authenticated request', async() => {

    await app().post('/api/v1/user/signup').send(user);

    const login = await app().post('/api/v1/user/login').send({ email: user.email, password: user.password});
    token = login.body.data.token;

    const headers = {
      authorization: `Bearer ${token}`
    };

    const profile = await app().get('/api/v1/user/profile').set(headers);
    userProfileId = profile.body.data.id;

    const posts = [
      {
        userProfileId,
        title: 'test post',
        content: 'This is a test post!'
      },
      {
        userProfileId,
        title: 'second test post',
        content: 'This is a second test post!'
      },
      {
        userProfileId,
        title: 'third test post',
        content: 'This is a third test post!'
      },
      {
        userProfileId,
        title: 'forth test post',
        content: 'This is a forth test post!'
      },
      {
        userProfileId,
        title: 'fifth test post',
        content: 'This is a fifth test post!'
      },
      {
        userProfileId,
        title: 'test post',
        content: 'This is a test post!'
      },
    ];

    await Post.bulkCreate(...posts);

    const response = await app().get('/api/v1/posts').set(headers);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('posts');
    expect(response.body.data).toHaveProperty('totalPages');
    expect(response.body.data).toHaveProperty('currentPage');
    expect(response.body.data.posts).toEqual(expect.any(Array));
  })
})

