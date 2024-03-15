import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  caption: String,
  description: String,
  productionYear: String,
  engineCode: String,
  cardImage: String,
  carModel: String,
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comment" }],
});

export const PostModel = mongoose.model("post", postSchema);
