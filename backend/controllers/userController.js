import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import query from "../config/db.js";
import bcrypt from "bcryptjs";
import config from "config";

// @desc    Auth user & get token
// * @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body; // destructuring from req.body
  let user = await query("SELECT * FROM User_Auth WHERE email = ?", [email]);

  user = user[0];

  if (!user) return res.status(400).json({ error: "Email not found" });
  const match = await bcrypt.compare(password, user.password);

  if (user && match) {
    // if user exists and password matches
    generateToken(res, user.user_id); // generate the token and send it to the client

    res.json({
      user_id: user.user_id,
      name: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // if user does not exist
    res.status(401); // 401 ==> unauthorized access (user does not exist)
    throw new Error("Invalid email or password");
  }
});

// @desc   Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    username,
    email,
    password,
    first_name,
    last_name,
    city_id,
    address,
    contact_number,
  } = req.body; // destructuring from req.body

  const userExists = await query(
    "SELECT email FROM User_Auth WHERE email = ?",
    [email]
  ); // check if the user already exists by checking the email
  if (userExists.length) {
    // if user already exists
    res.status(400); // 400 ==> bad request (client side error)
    throw new Error("User already exists. Please try with a different email");
  }

  // hash the password using the jwt secret key
  const salt = await bcrypt.genSalt(10);
  const hahsedPassword = await bcrypt.hash(password, salt);
  // if user does not exist -->  we will create the user
  let user = await query("CALL register_customer(?, ?, ?, ?, ?, ?, ?, ?)", [
    username,
    email,
    hahsedPassword,
    first_name,
    last_name,
    parseInt(city_id),
    address,
    contact_number,
  ]);

  if (user) {
    user = user[0][0];
    // if user is created successfully
    generateToken(res, user.user_id); // generate the token and send it to the client
    res.status(201).json({
      // 201 ==> something is created
      user_id: user.user_id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    // if user is not created
    res.status(400); // 400 ==> bad request (client side error)
    throw new Error("Invalid user data. Could not register the user.");
  }
});

// @desc    Logout user and clear the stored cookie
// @route   POST /api/users/logout
// @access  Private
const logOutUser = asyncHandler(async (req, res) => {
  // this will remove the cookie from the browser and the user will be logged out
  res.cookie("jwt", "", {
    // set the cookie to an empty string
    httpOnly: true,
    expires: new Date(0), // expires immediately
  });
  res
    .status(200)
    .json({ message: "Cleared the cookie and Logged out successfully" });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private TODO: Check
const getUserProfile = asyncHandler(async (req, res) => {
  // todo: use appropriate SQL query
  // const user = await User.findById(req.user_id); // find the user by id
  let user = await query("SELECT * FROM User_Auth", [req.user_id]);

  if (user) {
    // if user exists
    user = user[0];
    res.status(200).json({
      user_id: user_id,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404); // 404 ==> not found
    throw new Error("User not found");
  }
});

const getUserProfileByEmail = asyncHandler(async (req, res) => {
  let user = (await query("CALL get_customer(?)", [req.body.email]))[0][0];

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404);
    throw new Error("User not found.");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile  Here no need to use :id because we will use the token
// @access  Private TODO:
const updateUserProfile = asyncHandler(async (req, res) => {
  // todo: use appropriate SQL query
  const user = await User.findById(req.user._id); // find the user by id
  if (user) {
    user.name = req.body.name || user.name; // if name is provided then update the name, otherwise keep the old name
    user.email = req.body.email || user.email; // if email is provided then update the email, otherwise keep the old email

    if (req.body.password) {
      // if password is provided
      user.password = req.body.password; // update the password
    }

    const updatedUser = await user.save(); // save the updated user

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404); // 404 ==> not found
    throw new Error("Could not update. User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
//***  @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  // todo: use appropriate SQL query
  const users = await query("SELECT * FROM User_Auth", []);
  res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
//***  @access  Private/Admin TODO:
const deleteUser = asyncHandler(async (req, res) => {
  // todo: use appropriate SQL query
  const user = await User.findById(req.params.id); // find the user by id
  if (user) {
    if (user.isAdmin) {
      // if the user we trynna delete is an  admin do not delete

      res.status(400); // 400 ==> bad request (client side error)
      throw new Error("Cannot delete the  admin user");
    }
    // todo : use sql query to delete user by id
    await User.deleteOne({ _id: user._id }); // remove the user
    res.status(200).json({ message: "User deleted successfully" });
  } else {
    res.status(404); // 404 ==> not found
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
//***  @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  // todo: use appropriate SQL query
  const user = await query("SELECT * FROM User_Auth WHERE user_id = ?", [
    req.params.id,
  ]); // find the user by id (without the password)
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404); // 404 ==> not found
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
//***  @access  Private/Admin TODO:
const updateUser = asyncHandler(async (req, res) => {
  // todo: use appropriate SQL query
  const user = await User.findById(req.params.id); // find the user by id
  if (user) {
    user.name = req.body.name || user.name; // if name is provided then update the name, otherwise keep the old name
    user.email = req.body.email || user.email; // if email is provided then update the email, otherwise keep the old email
    user.isAdmin = Boolean(req.body.isAdmin); // update the isAdmin field

    const updatedUser = await user.save(); // save the updated user

    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404); // 404 ==> not found
    throw new Error("Could not update. User not found");
  }
});

export {
  authUser,
  registerUser,
  logOutUser,
  getUserProfile,
  getUserProfileByEmail,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
