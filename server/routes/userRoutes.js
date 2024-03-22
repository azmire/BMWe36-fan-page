import express from "express";
import {
  addUser,
  getUserById,
  getUsers,
  logInUser,
} from "../controllers/userController.js";
import { multerUpload } from "../middleware/multer.js";

const userRouter = express.Router();

userRouter.get("/allusers", getUsers);
userRouter.post("/login", logInUser);
userRouter.post("/register", multerUpload.single("avatar"), addUser);
userRouter.get("/:id", getUserById);

export default userRouter;
