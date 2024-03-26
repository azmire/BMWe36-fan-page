import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: String,
  description: String,
  productionYear: String,
  engineCode: String,
  cardImage: [String],
  carModel: String,
  like: { type: Number, default: 0 },
  likeButtonDisabled: { type: Boolean, default: false },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

export const PostModel = mongoose.model("post", postSchema);
