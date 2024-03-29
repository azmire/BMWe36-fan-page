import express from "express";
import { addComment, getComments } from "../controllers/commentController.js";
import jwtAuth from "../middleware/jwtAuth.js";

const commentRouter = express.Router();

commentRouter.get("/allcomments", jwtAuth, getComments);
commentRouter.post("/addcomment", jwtAuth, addComment);

export default commentRouter;
