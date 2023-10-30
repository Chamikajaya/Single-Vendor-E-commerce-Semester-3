import jwt from "jsonwebtoken";
import asyncHandler from "./asyncHandler.js";
import User from "../models/userModel.js";
import query from "../config/db.js";

// *** Protect routes ==> to protect the routes from unauthorized access
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // read the token from the cookie
  token = req.cookies.jwt; // jwt ==> name of the cookie that we set in controller
  if (token) {
    try {
      const decoded = jwt.verify(token, "JWT_SECRET"); // decode the token  (in this case the userId)
      // here decoded is an object which contains the userId

      // todo : use appropriate SQL query ==>
      // req.user = await User.findById(decoded.userId).select("-password"); // find the user by id + exclude the password field, and finally add the user to the request object ☝️
      req.user = await query("SELECT * FROM User_Auth WHERE user_id = ?", [
        decoded.userId,
      ]);
      next(); // go to the next middleware
    } catch (error) {
      console.log(error);
      res.status(401); // 401 ==> unauthorized access
      throw new Error("Not authorized, token is there but not valid");
    }
  } else {
    res.status(401); // 401 ==> unauthorized access
    throw new Error("Not authorized, no token found");
  }
});

// *** Admin middleware  ==> to check if the user is admin or not
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    // if user exists and if user is admin
    next(); // go to the next middleware
  } else {
    res.status(401); // 401 ==> unauthorized access
    throw new Error(
      "Not authorized as an admin. Only admins can access this route"
    );
  }
};

export { protect, admin };
