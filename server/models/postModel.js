import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  description: String,
  productionYear: Number,
  engine: String,
});

export const PostModel = mongoose.model("post", postSchema);
