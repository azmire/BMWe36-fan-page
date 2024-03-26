import { model } from "mongoose";
import { PostModel } from "../models/postModel.js";
import { imageUpload } from "../utils/uploadImage.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find()
      .populate({
        path: "comments",
      })
      .populate({
        path: "author",
      });
    res.status(200).json(allPosts);
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (req, res) => {
  const { description, productionYear, engineCode, carModel, caption } =
    req.body;

  try {
    const attachedFile = req.files != undefined;
    console.log("REUEST:>> ", req.files);
    if (attachedFile) {
      console.log("creating post with card image");
      const uploadedImagesArray = await imageUpload(req.files, "cardImage");
      console.log("uploadedImagesArray :>> ", uploadedImagesArray);

      const post = new PostModel({
        caption: caption,
        description: description,
        productionYear: productionYear,
        engineCode: engineCode,
        cardImage: uploadedImagesArray,
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

export const updatePost = async (req, res) => {
  try {
    const update = {
      like: req.body.like,
      likeButtonDisabled: req.body.likeButtonDisabled,
    };

    const id = { _id: req.params.id };
    console.log("id :>> ", id);

    const post = await PostModel.findOneAndUpdate(id, update, {
      new: true,
      upsert: true,
    });
    const newPost = await post.save();
    res.status(200).json(newPost);
  } catch (err) {
    console.log(err);
  }
};
