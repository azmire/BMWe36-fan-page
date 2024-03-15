import { model } from "mongoose";
import { PostModel } from "../models/postModel.js";
import { imageUpload } from "../utils/uploadImage.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find().populate({ path: "comments" });
    res.status(200).json(allPosts);
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (req, res) => {
  const { description, productionYear, engineCode, carModel, caption } =
    req.body;

  try {
    const attachedFile = req.file != undefined;

    if (attachedFile) {
      console.log("creating post with card image");
      const uploadedImage = await imageUpload(req.file, "cardImage");
      const { secure_url, public_id } = uploadedImage;
      const post = new PostModel({
        caption: caption,
        description: description,
        productionYear: productionYear,
        engineCode: engineCode,
        cardImage: secure_url,
        carModel: carModel,
      });
      const newPost = await post.save();
      res.status(200).json(newPost);
    } else {
      console.log("creating post without card image");
      const newPost = new PostModel({
        caption: caption,
        description: description,
        productionYear: productionYear,
        engineCode: engineCode,
        carModel: carModel,
      });
      const result = await newPost.save();
      res.status(200).json(result);
    }
  } catch (err) {
    console.log(err);
  }
};

export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await PostModel.findById(id).populate({
      path: "comments",
    });
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json(post);
  } catch (err) {
    console.error("Error fetching post by id:", err);
    res.status(500).json({ message: "Error fetching post", err: err.message });
  }
};
