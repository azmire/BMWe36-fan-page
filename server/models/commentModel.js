import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    post: { type: mongoose.Schema.Types.ObjectId, ref: "post" },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("comment", commentSchema);
