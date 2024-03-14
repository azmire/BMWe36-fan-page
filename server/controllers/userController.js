import { UserModel } from "../models/userModel.js";
import { imageUpload } from "../utils/uploadImage.js";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
  }
};

export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error("Error fetching user by id:", err);
    res.status(500).json({ message: "Error fetching user", err: err.message });
  }
};

export const addUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  // const userExist = await UserModel.findOne({ $or: [{ email }, { username }] });
  const emailExist = await UserModel.findOne({ email });
  const usernameExist = await UserModel.findOne({ username });
  if (emailExist) {
    return res.status(400).json({
      message: "User with this e-mail already exists. Log in please.",
    });
  } else if (usernameExist) {
    return res
      .status(400)
      .json({ message: "User with this username already exists." });
  } else {
    try {
      console.log("req.file", req.file);
      const attachedFile = req.file !== undefined;

      if (attachedFile) {
        console.log("file attached");
        const uploadedImage = await imageUpload(req.file, "avatar");
        const { secure_url, public_id } = uploadedImage;
        const newUser = new UserModel({
          email: email,
          username: username,
          password: password,
          avatar: secure_url,
        });
        const result = await newUser.save();
        res.status(200).json(result);
      } else {
        console.log("creating user without avatar");
        const newUser = new UserModel({
          email: email,
          username: username,
          password: password,
        });
        const result = await newUser.save();
        res.status(200).json(result);
      }
    } catch (e) {
      console.log(e);
    }
  }
};
