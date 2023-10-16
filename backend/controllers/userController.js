
import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import generateToken from "../utils/generateToken.js";

// @desc    Auth user & get token
// * @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;  // destructuring from req.body

    // todo : use appropriate SQL query
    const user = await User.findOne({ email });  // todo : use appropriate SQL query

    if (user && (await user.matchPassword(password))) {  // if user exists and password matches  // todo : use appropriate SQL for matching password implementation in userModel.js
        generateToken(res, user._id);  // generate the token and send it to the client

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {  // if user does not exist
        res.status(401);  // 401 ==> unauthorized access (user does not exist)
        throw new Error('Invalid email or password');
    }
});

// @desc   Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;  // destructuring from req.body

    // todo : use appropriate SQL query  ==>
    const userExists = await User.findOne({ email });  // check if the user already exists by checking the email
    if (userExists) {  // if user already exists
        res.status(400);  // 400 ==> bad request (client side error)
        throw new Error('User already exists. Please try with a different email');
    }
    // if user does not exist -->  we will create the user

    // todo : use appropriate SQL query
    const user = await User.create({
        name,
        email,
        password

    });

    if (user) {  // if user is created successfully
        generateToken(res, user._id);  // generate the token and send it to the client
        res.status(201).json({  // 201 ==> something is created
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        });

    } else {  // if user is not created
        res.status(400);  // 400 ==> bad request (client side error)
        throw new Error('Invalid user data. Could not register the user.');
    }





});

// @desc    Logout user and clear the stored cookie
// @route   POST /api/users/logout
// @access  Private
const logOutUser = asyncHandler(async (req, res) => {  // this will remove the cookie from the browser and the user will be logged out
    res.cookie('jwt', '', {  // set the cookie to an empty string
        httpOnly: true,
        expires: new Date(0),  // expires immediately
    });
    res.status(200).json({ message: 'Cleared the cookie and Logged out successfully' });
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
    // todo: use appropriate SQL query
    const user = await User.findById(req.user._id);  // find the user by id

    if (user) {  // if user exists
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin
        })
    } else {
        res.status(404);  // 404 ==> not found
        throw new Error('User not found');
    }

});

// @desc    Update user profile
// @route   PUT /api/users/profile  Here no need to use :id because we will use the token
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {

    // todo: use appropriate SQL query
    const user = await User.findById(req.user._id);  // find the user by id
    if (user){
        user.name = req.body.name || user.name;  // if name is provided then update the name, otherwise keep the old name
        user.email = req.body.email || user.email;  // if email is provided then update the email, otherwise keep the old email

        if (req.body.password) {  // if password is provided
            user.password = req.body.password;  // update the password
        }

        const updatedUser = await user.save();  // save the updated user

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        })
    }else{
        res.status(404);  // 404 ==> not found
        throw new Error('Could not update. User not found');
    }


});

// @desc    Get all users
// @route   GET /api/users
//***  @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
    // todo: use appropriate SQL query
    const users = await User.find({});  // find all the users
    res.status(200).json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
//***  @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
    // todo: use appropriate SQL query
    const user = await User.findById(req.params.id); // find the user by id
    if (user) {
        if (user.isAdmin) {  // if the user we trynna delete is an  admin do not delete

            res.status(400);  // 400 ==> bad request (client side error)
            throw new Error('Cannot delete the  admin user');
        }
        // todo : use sql query to delete user by id
        await User.deleteOne({_id: user._id});  // remove the user
        res.status(200).json({message: "User deleted successfully"});

    }
    else{
        res.status(404);  // 404 ==> not found
        throw new Error('User not found');
    }

});

// @desc    Get user by ID
// @route   GET /api/users/:id
//***  @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
    // todo: use appropriate SQL query
    const user = await User.findById(req.params.id).select('-password');  // find the user by id (without the password)
    if (user) {
        res.status(200).json(user);
    }
    else{
        res.status(404);  // 404 ==> not found
        throw new Error('User not found');
    }
});

// @desc    Update user
// @route   PUT /api/users/:id
//***  @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
    // todo: use appropriate SQL query
    const user = await User.findById(req.params.id);  // find the user by id
    if (user){
        user.name = req.body.name || user.name;  // if name is provided then update the name, otherwise keep the old name
        user.email = req.body.email || user.email;  // if email is provided then update the email, otherwise keep the old email
        user.isAdmin = Boolean(req.body.isAdmin);  // update the isAdmin field

        const updatedUser = await user.save();  // save the updated user

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin
        });


    }else{
        res.status(404);  // 404 ==> not found
        throw new Error('Could not update. User not found');


    }


});


export {
    authUser,
    registerUser,
    logOutUser,
    getUserProfile,
    updateUserProfile,
    getUsers,
    deleteUser,
    getUserById,
    updateUser
}