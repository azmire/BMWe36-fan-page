import express from "express";
import {
  addPost,
  getPostById,
  getPosts,
  updatePost,
} from "../controllers/postController.js";
import { multerUpload } from "../middleware/multer.js";
import jwtAuth from "../middleware/jwtAuth.js";

const postRouter = express.Router();

postRouter.get("/allposts", jwtAuth, getPosts);
postRouter.get("/:id", getPostById);
postRouter.patch("/:id", updatePost);
postRouter.post("/addpost", multerUpload.any("cardImage"), addPost);

export default postRouter;
