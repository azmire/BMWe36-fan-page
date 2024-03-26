import { CommentModel } from "../models/commentModel.js";

export const getComments = async (req, res) => {
  try {
    const allComments = await CommentModel.find().populate({ path: "author" });
    res.status(200).json(allComments);
  } catch (e) {
    console.log(e);
  }
};

export const addComment = async (req, res) => {
  try {
    const comment = new CommentModel(req.body);
    const newComment = await comment.save();
    res.status(200).json(newComment);
  } catch (err) {
    console.log(err);
  }
};
