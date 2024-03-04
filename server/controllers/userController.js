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

export const addUser = async (req, res) => {
  try {
    const user = new UserModel(req.body);
    const { email } = user;
    const userExist = await UserModel.findOne({ email });
    if (userExist) {
      return res
        .status(400)
        .json({ message: "User with this e-mail already exists." });
    }
    const newUser = await user.save();
    res.status(200).json(newUser);
  } catch (err) {
    console.log("err :>> ", err);
  }
};
