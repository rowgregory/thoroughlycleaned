import jwt from "jsonwebtoken";
import generateRandomString from "./genereateRandomString";

export const generateToken = (user: any, expiresIn: any) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in the environment variables.");
  }

  return jwt.sign(user ?? { username: generateRandomString(8) }, secret, {
    expiresIn,
  });
};
