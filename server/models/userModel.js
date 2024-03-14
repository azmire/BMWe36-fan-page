import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default: "src/assets/avatar-jpg.jpeg",
    },
    imagePlaceholder: {
      type: String,
      default: "src/assets/image-placeholder.jpeg",
    },
  },
  { timestamps: true }
);
export const UserModel = mongoose.model("user", userSchema);
