import jwt from "jsonwebtoken";

export const generateToken = (user) => {
  const { _id, email } = user;
  const payload = {
    sub: _id,
    email: email,
  };
  const options = {
    expiresIn: "1d",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET, options);
  console.log("token :>> ", token);
  return token;
};
