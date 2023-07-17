import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protect routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Read the JWT from the cookie
  token = req.cookies.jwt; // 'jwt' is how we called it

  if (token) {
    try {
      // We will get the user id from the decoded variable
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Now we get the user id, exclude the password and add that to the request
      // so now all request will pass this user in all rotes
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (err) {
      console.log(err);
      res.status(401);
      throw new Error('Not authorized, token failed');
    }
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
});

// Admin middleware
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error('Not authorized, no token');
  }
};

export { protect, admin };
