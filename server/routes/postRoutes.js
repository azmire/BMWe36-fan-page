import express from "express";
import { addPost, getPosts } from "../controllers/postController.js";

const postRouter = express.Router();

postRouter.get("/allposts", getPosts);
postRouter.post("/addpost", addPost);

export default postRouter;
