import jwt from "jsonwebtoken";
import { isBlacklisted } from "../utils/blacklistedTokens";

const authenticate = (req, res, next) => {
  const authHeader = req.headers.a;

  //create token
  const token = jwt.sign(
    {
      id: authenticateUser._id,
      name: authenticateUser.fullname,
      email: authenticateUser.email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};
