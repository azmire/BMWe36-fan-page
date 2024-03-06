import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";

const commentRouter = express.Router();

commentRouter.get("/allcomments", getComments);
commentRouter.post("/addcomment", addComment);

export default commentRouter;
