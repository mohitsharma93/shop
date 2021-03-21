const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please enter your name'],
    maxLength: [30, 'Your name cannot exceed 30 characters']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email address'],
    unique: true,
    validators: [validator.isEmail, 'Please enter a valid email address']
  },
  password: {
    type: String,
    required: [true, 'Please enter your password'],
    minLength: [5, 'Password must be longer than 5 characters'],
    select: false // when i display user we not show password
  },
  avatar: {
    public_id: { // cloudinary id
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  role: {
    type: String,
    default: 'user'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
});

// Encrypt the password.
userSchema.pre('save', async function(next) {
  if(!this.isModified('password')) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10)
});

// Compare Password.
userSchema.methods.comparePassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
}

// Return JWT Token.
userSchema.methods.getJwtToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_TIME
  })
}

// generate password for reset token.
userSchema.methods.getResetPasswordToken = function() {
  // generate token for reset token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // hash and set to resetPasswordToken.
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

  // set token expire time which is +30 minutes from now.
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
}

module.exports = mongoose.model('User', userSchema);