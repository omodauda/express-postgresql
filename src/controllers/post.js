import { Post, Profile } from '../database/models';
import { successMsg, errorMsg } from '../utils/response';

export default class PostController {
  static async createPost(req, res) {
    try {
      const { title, content } = req.body;
      const userProfile = await Profile.findOne({ where: { userId: req.user.id } });
      const userProfileId = userProfile.id;
      const newPost = await Post.create({ userProfileId, title, content });
      return successMsg(res, 201, 'new post created', newPost);
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error');
    }
  }

  static async editPost(req, res) {
    const { id } = req.params;
    try {
      const editedPost = await Post.update(req.body, { returning: true, where: { id } });
      const [rows, data] = editedPost;
      return successMsg(res, 200, 'successfully updated post', data);
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error');
    }
  }
}
