import jwt from "jsonwebtoken";
import config from "config";

const generateToken = (res, userId) => {
  // Create JWT (JSON Web Token) ==> This will be used to authenticate the user
  const token = jwt.sign({ userId: userId }, "JWT_SECRET", {
    expiresIn: "30d",
  }); // here first arg is payload which is used to identify the user

  // Set JWT as HTTP-only cookie ==> This will have the cookie set with userID
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // if in development mode then secure will be false, otherwise true (if in production mode)
    sameSite: "strict", // to prevent CSRF (Cross-Site Request Forgery) attacks
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });
};

export default generateToken;
