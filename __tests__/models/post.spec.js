/*
  jest-environment node
*/
import { async } from 'regenerator-runtime';
import { User, Profile, Post } from '../../src/database/models';
import { connectDb, disconnectDb} from '../utils/db';

describe('This describes the Post model', () => {

  const user = {
    email: 'post_test@yahoo.com',
    password: 'testing'
  };

  const userProfile = {
    first_name: 'post',
    last_name: 'test',
    age: 20
  };

  const newPost = {
    title: 'test post',
    content: 'this is a test post!'
  };

  let newUser;
  let profile;
  let post;

  beforeAll(async() => {
    await connectDb();
    newUser = await User.create(user);
    profile = await Profile.create({userId: newUser.dataValues.id, ...userProfile });
    post = await Post.create({ userProfileId: profile.dataValues.id, ...newPost});
  });

  afterAll(async() => {
    await disconnectDb();
  });

  it('should create a post for an existing user', async() => {
    expect(post.dataValues.title).toBe('test post');
    expect(post.dataValues.content).toBe('this is a test post!');
    expect(post.dataValues.userProfileId).toBe(profile.dataValues.id);
  });
});