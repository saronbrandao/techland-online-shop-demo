import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Adding a method to the userSchema
userSchema.methods.matchPassword = async (enteredPassword, userPassword) => {
  return await bcrypt.compare(enteredPassword, userPassword);
};

const User = mongoose.model('User', userSchema);

export default User;
