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
userRouter.get("/:id", getUserById);
userRouter.post("/login", logInUser);
userRouter.post("/register", multerUpload.single("avatar"), addUser);

export default userRouter;
