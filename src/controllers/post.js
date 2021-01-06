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

  static async getAllPosts(req, res) {
    // parse pageNo & size from query
    const page_number = parseInt(req.query.pageNo, 10);
    const size = parseInt(req.query.size, 10);
    // calc no of items to offset
    const skip = size * (page_number - 1) || 0;
    // no of items to return per page
    const limit = size || 5;

    if (page_number <= 0) {
      return errorMsg(res, 400, 'Invalid page number, should start with 1');
    }
    try {
      const totalCount = await Post.count();
      const posts = await Post.findAll({ offset: skip, limit });
      const totalPages = Math.ceil(totalCount / size);
      const currentPage = page_number;
      const data = {
        posts,
        totalPages,
        currentPage,
      };
      return successMsg(res, 200, '', data);
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

  static async deletePost(req, res) {
    const { id } = req.params;
    try {
      await Post.destroy({ where: { id } });
      return successMsg(res, 200, 'post deleted successfully');
    } catch (error) {
      return errorMsg(res, 500, 'Internal server error');
    }
  }
}
