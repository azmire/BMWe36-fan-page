import { UserModel } from "../models/userModel.js";

export const testRoute = (req, res) => {
  res.send("User testing route....");
};

export const getUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find();
    res.status(200).json(allUsers);
  } catch (e) {
    console.log(e);
  }
};
