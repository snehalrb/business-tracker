import jwt from "jsonwebtoken";
//import { isBlacklisted } from "../utils/blacklistedTokens";

export const createToken = (id, name, email) => {
  if (!id || !name || !email) return;
  //create token
  const token = jwt.sign(
    {
      id: id,
      name: name,
      email: email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  return token;
};
