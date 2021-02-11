/* 
  @jest-environment node
*/
import server from '../../../src/app';
import { connectDb, disconnectDb} from '../../server/utils/db';
import { User } from '../../../src/database/models';
import supertest from 'supertest';

const app = () => supertest(server);

describe('The login process', () => {

  const url = '/api/v1/user/login';

  const user = {
    email: 'test-login@yahoo.com',
    password: 'testing',
    first_name: 'logintest',
    last_name: 'test',
    age: 15,
  };

  let newUser;

  beforeAll(async() => {
    await connectDb();
    newUser = await User.create(user);
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should login a registered user', async() => {
    const response = await app().post(url).send({email: user.email, password: user.password});

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('status', 'success');
    expect(response.body).toHaveProperty('message', 'login successful');
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('token');
    expect(response.body.data.token).toEqual(expect.any(String));
    expect(response.body.data).toHaveProperty('user');
  });

  it('should return 400 for invalid password', async() => {
    const response = await app().post(url).send({email: user.email, password: 'xxxxx'});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'fail');
    expect(response.body).toHaveProperty('error', 'Invalid password');
  });

  it('should return a 400 for a non-registered email', async() => {
    const response = await app().post(url).send({email: 'invalidmail@yahoo.com', password: 'xxxxx'});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('status', 'fail');
    expect(response.body).toHaveProperty('error', 'user with email invalidmail@yahoo.com not registered');

  });
});