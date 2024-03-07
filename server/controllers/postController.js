import { PostModel } from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
    const allPosts = await PostModel.find();
    res.status(200).json(allPosts);
  } catch (e) {
    console.log(e);
  }
};

export const addPost = async (req, res) => {
  try {
    const post = new PostModel(req.body);
    const newPost = await post.save();
    res.status(200).json(newPost);
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
