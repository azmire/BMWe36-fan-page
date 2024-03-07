import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    comment: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  },
  {
    timestamps: true,
  }
);

export const CommentModel = mongoose.model("comment", commentSchema);
