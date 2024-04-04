import express from "express";
import {
  addComment,
  deleteComment,
  getComments,
} from "../controllers/commentController.js";
import jwtAuth from "../middleware/jwtAuth.js";

const commentRouter = express.Router();

commentRouter.get("/allcomments", jwtAuth, getComments);
commentRouter.delete("/deletecomment", jwtAuth, deleteComment);
commentRouter.post("/addcomment", addComment);

export default commentRouter;
