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
  const user = {
    email: req.body.email,
    password: req.body.password,
    username: req.body.username,
  };
  const newUser = new UserModel(user);
  if (!req.body.email || !req.body.password || !req.body.username) {
    return res.status(400).json({ error: "Please fill out all fields" });
  }
  try {
    const userExist = await UserModel.findOne(user);

    if (userExist) {
      return res
        .status(400)
        .json({ message: "User with this e-mail already exists." });
    } else {
      const result = await newUser.save();
      res.status(200).json(result);
    }
  } catch (e) {
    console.log(e);
  }
};
