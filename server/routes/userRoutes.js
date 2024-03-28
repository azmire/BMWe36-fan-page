import express from "express";
import {
  addUser,
  getUserById,
  getUsers,
  logInUser,
  updateUser,
} from "../controllers/userController.js";
import { multerUpload } from "../middleware/multer.js";
import jwtAuth from "../middleware/jwtAuth.js";

const userRouter = express.Router();

userRouter.get("/allusers", getUsers);
userRouter.post("/login", logInUser);
userRouter.patch("/:id", multerUpload.single("avatar"), updateUser);
userRouter.post("/register", multerUpload.single("avatar"), addUser);
userRouter.get("/:id", getUserById);

export default userRouter;
