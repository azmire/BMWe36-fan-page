import express from "express";
import { addUser, getUsers, testRoute } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/test", testRoute);
userRouter.get("/allusers", getUsers);

userRouter.post("/adduser", addUser);

export default userRouter;
