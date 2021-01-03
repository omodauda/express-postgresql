import { User, Profile } from '../database/models';

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

      return res
        .status(201)
        .json({
          status: 'success',
          message: 'User successfully created',
        });
    } catch (error) {
      return res
        .status(500)
        .json({
          status: 'fail',
          error: error.message,
        });
    }
  }
}
