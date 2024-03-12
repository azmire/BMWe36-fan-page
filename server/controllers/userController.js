import { UserModel } from "../models/userModel.js";

export const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
  }
};

export const addUser = async (req, res) => {
  const { email, username, password } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }

  const userExist = await UserModel.findOne({
    email,
    username,
  });

  if (userExist) {
    return res
      .status(400)
      .json({ message: "User with this e-mail already exists." });
  }
  try {
    const newUser = new UserModel({ email, username, password });
    const result = await newUser.save();
    res.status(200).json(result);
  } catch (e) {
    console.log(e);
  }
};
