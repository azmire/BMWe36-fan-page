import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  description: String,
  productionYear: Number,
  engine: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

export const PostModel = mongoose.model("post", postSchema);
