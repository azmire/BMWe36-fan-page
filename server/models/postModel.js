import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: String,
  description: String,
  productionYear: String,
  engineCode: String,
  cardImage: [String],
  carModel: String,
  usersWhoLiked: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  liked: { type: Boolean, default: false },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

export const PostModel = mongoose.model("post", postSchema);
