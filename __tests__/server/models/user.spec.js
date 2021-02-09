/*
  @jest-environment node
*/

import { async } from 'regenerator-runtime';
import { User } from '../../../src/database/models';
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
    // console.log(newUser.dataValues)
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should hash user password before saving', async() => {
    expect(newUser.dataValues.password).not.toMatch('testing');
  });

  it('confirm saved data values', async() => {
    expect(newUser.dataValues.email).toBe('test@yahoo.com');
    expect(bcrypt.compareSync(user.password, newUser.dataValues.password)).toBe(true);
    expect(newUser.dataValues.id).toEqual(expect.stringMatching(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/))
  });

})