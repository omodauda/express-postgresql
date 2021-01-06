import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, Profile } from '../database/models';
import { errorMsg, successMsg } from '../utils/response';

const signToken = (user) => jwt.sign({
  iss: 'omodauda',
  sub: user.id,
  iat: new Date().getTime(),
  expiresIn: '7d',
}, process.env.JWT_SECRET);

export default class UserController {
  static async registerUser(req, res) {
    try {
      const {
        email,
        password,
        first_name,
        last_name,
        age,
      } = req.body;

      const newUser = await User.create({ email, password });

      const userprofile = await Profile.create({
        userId: newUser.id, first_name, last_name, age,
      });

      return successMsg(res, 201, 'user successfully registered');
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error, pls try again');
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return errorMsg(res, 400, `user with email ${email} not registered`);
      }
      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return errorMsg(res, 400, 'Invalid password');
      }
      const token = signToken(user);
      return successMsg(res, 200, 'login successful', { token, user });
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error, pls try again');
    }
  }

  static async profile(req, res) {
    try {
      const userprofile = await Profile.findOne({ where: { userId: req.user.id } });
      return successMsg(res, 200, '', userprofile);
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error, pls try again');
    }
  }
}
