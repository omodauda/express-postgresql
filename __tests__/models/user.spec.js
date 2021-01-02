/*
  @jest-environment node
*/

import { async } from 'regenerator-runtime';
import { User } from '../../src/database/models';
import bcrypt from 'bcryptjs';
import { connectDb, disconnectDb } from '../utils/db';

describe('The User model', () => {

  const user = {
    email: 'test@yahoo.com',
    password: 'testing'
  };

  let newUser;

  beforeAll(async() => {
    await connectDb();

    newUser = await User.create(user);
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should hash user password before saving', async() => {
    expect(bcrypt.compareSync(user.password, newUser.dataValues.password)).toBe(true);
  });

})