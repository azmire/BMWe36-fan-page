import express from "express";
import { addUser, getUsers } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/allusers", getUsers);

userRouter.post("/register", addUser);

export default userRouter;
