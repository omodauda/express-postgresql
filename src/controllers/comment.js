import { Comment, Post, Profile } from '../database/models';
import { successMsg, errorMsg } from '../utils/response';

export default class CommentController {
  static async createComment(req, res) {
    try {
      const { comment, postId } = req.body;
      const { id } = req.user;
      const post = await Post.findByPk(postId);
      if (!post) {
        return errorMsg(res, 400, 'post does not exist');
      }

      const userProfile = await Profile.findOne({ where: { userId: id } });

      await Comment.create({ comment, postId, userProfileId: userProfile.id });

      return successMsg(res, 201, 'comment successfully created');
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error');
    }
  }
}
