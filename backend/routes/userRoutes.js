import express from "express";
const router = express.Router();
import {
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
} from "../controllers/userController.js";
import { protect, admin } from "../middleware/authMiddleware.js";
// '/' ==> api/users
router.route("/").post(registerUser); // to register a user (public)
router.route("/").get(protect, admin, getUsers); // fetch all the users ==>  need to use both protect and admin middlewares to protect the route as well as we need to check if the user is admin or not
router.post("/auth", authUser); // to login a user (public)
router.post("/logout", logOutUser); // to logout a user (private)
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); // use protect middleware to protect the route (to prevent unauthorized  access) ==> to get the user profile and to update the user profile (private)
router.route("/email").get(protect, getUserProfileByEmail);
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser); // to delete a user, to get a user by id and to update a user (admin)

export default router;
