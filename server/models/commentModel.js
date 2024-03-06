import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: String,
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("comment", commentSchema);
