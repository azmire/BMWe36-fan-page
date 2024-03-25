import { generateToken } from "../middleware/jwt.js";
import { UserModel } from "../models/userModel.js";
import { hashPassword, verifyPassword } from "../utils/bcrypt.js";

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
    console.log("id :>> ", id);
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
      const hashedPassword = await hashPassword(password); //FROM bcrypt.js
      const newUser = new UserModel({
        email: email,
        username: username,
        password: hashedPassword,
      });
      const result = await newUser.save();
      res.status(200).json(result);
    } catch (e) {
      console.log(e);
    }
  }
};

export const logInUser = async (req, res) => {
  console.log("loggin in user");
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    console.log("user :>> ", user);
    if (!user) {
      res.status(500).json({ message: "user has no account with this email" });
    }

    if (user) {
      const { password: hashedPassword } = user;
      const verified = await verifyPassword(password, hashedPassword);
      if (verified) {
        const token = generateToken(user);
        if (token) {
          console.log("user verified");
          res
            .status(201)
            .json({ message: "User logged in", token: token, id: user._id });
        } else {
          res.status(500).json({ message: "Failed to generate token" });
          console.log("Failed to generate token");
        }
      } else {
        res.status(500).json({ message: "Wrong password" });

        console.log("Wrong password");
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Wrong password", error: error.message });
  }
};
