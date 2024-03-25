import * as dotenv from "dotenv";
// loading .env file
dotenv.config();

import passport from "passport";
import express from "express";
import cors from "cors";
import userRouter from "./routes/userRoutes.js";
import postRouter from "./routes/postRoutes.js";
import commentRouter from "./routes/commentRoutes.js";
import mongoose from "mongoose";
import { cloudinaryConfig } from "./config/cloudinary.js";
import { passportConfig } from "./config/passportConfig.js";
/* import { UserModel } from "./models/userModel.js"; */

const app = express();
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(cors());

cloudinaryConfig();

const port = process.env.PORT || 9999;
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, () => {
      console.log(
        "Connection to MongoDB established, and server is running on port " +
          port
      );
    });
  })
  .catch((err) => console.log(err));
app.use(passport.initialize());
passportConfig();

app.use("/api/users", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/comments", commentRouter);

app.use("*", (req, res) =>
  res.status(404).json({ error: "Endpoint not found." })
);
