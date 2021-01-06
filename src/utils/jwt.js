import jwt from 'jsonwebtoken';
import { User } from '../database/models';

// eslint-disable-next-line consistent-return
export default async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findByPk(decoded.sub);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        status: 'fail',
        error: 'Unauthorized request',
      });
  }
};
