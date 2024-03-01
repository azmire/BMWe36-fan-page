import express from "express";
import { getUsers, testRoute } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/test", testRoute);
userRouter.get("/allusers", getUsers);

export default userRouter;
