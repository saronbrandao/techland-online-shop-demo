import jwt from 'jsonwebtoken';
import asyncHandler from './asyncHandler.js';
import User from '../models/userModel.js';

// Protecting routes
const protect = asyncHandler(async (req, res, next) => {
  let token;
  
  // Reading JWT from the cookie
  token = req.cookies.jwt; // 'jwt' is how we called it
  
  if (token) {
    try {
      // Decoding token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Getting the user ID
      req.user = await User.findById(decoded.userId).select('-password');
      next();
    } catch (err) {
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
    throw new Error('Not authorized as admin');
  }
};

export { protect, admin };
