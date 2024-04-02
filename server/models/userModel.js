import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/dj5oelkov/image/upload/v1712059329/avatar/fzgb8tvjxbw9yorlix1q.jpg",
    },
    imagePlaceholder: {
      type: String,
      default:
        "https://res.cloudinary.com/dj5oelkov/image/upload/v1712059128/avatar/ogwoqhtjz0cm5ic6ijgv.jpg",
    },
    posts: [{ type: mongoose.Schema.Types.ObjectId, ref: "post" }],
  },
  { timestamps: true }
);
export const UserModel = mongoose.model("user", userSchema);
