const User = require('../models/userModel');
const asyncHandler = require("express-async-handler");
const { createToken, } = require('../config/jwtToken')

// register a user
const register = asyncHandler(async (req, res) => {
    //checking if users exist and geting the email from req.body
    const email = req.body.email;
    const findUser = await User.findOne({ email: email });
    if (!findUser) {
        //create a new user
        const newUser = await User.create(req.body);
        res.json({ newUser });
    } else {
        throw new Error("User Already Exists");
    }
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    //checking if user exist or not.
    const findUser = await User.findOne({ email });
    if (findUser && await findUser.comparePassword(password)) {
        const userToken = createToken(findUser);
        // res.json({
        //     _id: findUser?._id,
        //     firstname: findUser?.firstName,
        //     lastname: findUser?.lastName,
        //     email: findUser?.email,
        //     mobile: findUser?.mobile,
        //     token: createToken(findUser?._id)
        // })
        res.json({ findUser: userToken });
    } else {
        throw new Error("invalid Credenials");
    }
});

const getAllUsers = asyncHandler(async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        throw new Error(error);
    }
})

const getSingleUser = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        const getSingleUser = await User.findById(id);
        res.json({ getSingleUser })
    } catch (error) {
        throw new Error(error);
    }
})

module.exports = {
    register,
    login,
    getAllUsers,
    getSingleUser,
}