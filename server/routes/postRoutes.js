import express from "express";
import {
  addPost,
  getPostById,
  getPosts,
} from "../controllers/postController.js";
import { multerUpload } from "../middleware/multer.js";

const postRouter = express.Router();

postRouter.get("/allposts", getPosts);
postRouter.get("/:id", getPostById);
postRouter.post("/addpost", multerUpload.single("cardImage"), addPost);

export default postRouter;
