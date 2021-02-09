/*
  @jest-environment node
*/

import { async } from 'regenerator-runtime';
import { User, Profile } from '../../../src/database/models';
import { connectDb, disconnectDb} from '../utils/db';

describe('The Profile model', () => {

  const user = {
    email: 'test2@yahoo.com',
    password: 'testing'
  };

  const userProfile = {
    first_name: 'test',
    last_name: 'master',
    age: 20
  };

  let newUser;
  let profile;

  beforeAll(async() => {
    await connectDb();
    newUser = await User.create(user);
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it("should create a profile with the userId", async()=> {
    profile = await Profile.create({userId: newUser.dataValues.id, ...userProfile});
    expect(profile.dataValues.first_name).toBe('test');
    expect(profile.dataValues.last_name).toBe('master');
  });
});