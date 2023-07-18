import asyncHandler from '../middleware/asyncHandler.js';
import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

// @des       Auth user & get token
// @route     POST /api/users/login
// @access    Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password, user.password))) {
    // Creating the token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    // Set JWT as HTTP-Only cookie
    res.cookie('jwt', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== 'development', // will demand https if not in development
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    });
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

// @des       Register user
// @route     POST /api/users
// @access    Public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  const userExists = await User.findOne({email})

  // Checking if an user already exists with this email
  if(userExists){
    res.status(400)
    throw new Error('User already exists')
  } 

  // User information comming from the UI
  const user = await User.create({
    name,
    email,
    password
  });

  if(user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }

});

// @des       Logout user / clear cookie
// @route     POST /api/users/logout
// @access    Private
const logoutUser = asyncHandler(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: 'Logged out successfuly' });
});

// @des       Get user profile
// @route     GET /api/users/profile
// @access    Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.send('get user profile');
});

// @des       Update user profile
// @route     PUT /api/users/profile
// There is no need to pass an id because we will use the web token
// @access    Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.send('update user profile');
});

// @des       Get users
// @route     GET /api/users/
// @access    Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  res.send('get users');
});

// @des       Get user by ID
// @route     GET /api/users/:id
// @access    Private/Admin
const getUserByID = asyncHandler(async (req, res) => {
  res.send('get user by id');
});

// @des       Delete users
// @route     DELETE /api/users/:id
// @access    Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  res.send('delete user');
});

// @des       Update user
// @route     PUT /api/users/:id
// @access    Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  res.send('update user');
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
};
