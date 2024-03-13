import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://www.freedigitalphotos.net/images/img/homepage/87357.jpg",
    },
  },
  { timestamps: true }
);
export const UserModel = mongoose.model("user", userSchema);
