import { CommentModel } from "../models/commentModel.js";
import { PostModel } from "../models/postModel.js";

export const getComments = async (req, res) => {
  try {
    const allComments = await CommentModel.find().populate({ path: "author" });
    res.status(200).json(allComments);
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (req, res) => {
  const { post, author, comment } = req.body;
  console.log("post, author, comment  :>> ", post, author, comment);
  try {
    const comment = new CommentModel(req.body);
    const newComment = await comment.save();
    const { _id } = newComment;
    const postItem = await PostModel.findOneAndUpdate(
      { _id: post },
      {
        $push: { comments: _id },
      },
      { new: true }
    ).populate({ path: "comments", populate: { path: "author" } });

    console.log("postItem :>> ", postItem);

    res.status(200).json({ postItem });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = async (req, res) => {
  const { commentId, postId } = req.body;
  console.log("req.params.id :>> ", req.params.id);
  console.log("postId :>> ", postId);
  try {
    const deleteComment = await CommentModel.findOneAndDelete(commentId);

    const existingComments = await PostModel.findByIdAndUpdate(
      { _id: postId },
      {
        $pull: { comments: commentId },
      },
      {
        new: true,
        upsert: true,
      }
    ).populate({ path: "comments", populate: { path: "author" } });
    res.status(200).json({ existingComments });
  } catch (err) {
    console.log(err);
  }
};
