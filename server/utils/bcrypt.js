import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  const saltRounds = 10;

  const salt = await bcrypt.genSalt(saltRounds);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

export const verifyPassword = (password, hashedPassword) => {
  const verified = bcrypt.compare(password, hashedPassword);
  return verified;
};
