import * as dotenv from "dotenv";
dotenv.config();

import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import { UserModel } from "../models/userModel.js";
import passport from "passport";

const options = {
  secretOrKey: process.env.JWT_SECRET,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};
const verify = (jwt_payload, done) => {
  const { sub } = jwt_payload;

  try {
    const user = UserModel.findById(sub);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
};
export const passportConfig = () => {
  console.log("passport configuration");
  const strategy = new JwtStrategy(options, verify);
  const config = passport.use(strategy);
  return config;
};
