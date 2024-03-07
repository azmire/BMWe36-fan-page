import express from "express";
import {
  addPost,
  getPostById,
  getPosts,
} from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/allposts", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/addpost", addPost);

export default postRouter;
