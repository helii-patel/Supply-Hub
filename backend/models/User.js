const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['supplier', 'street_food_vendor', 'transporter', 'admin'],
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  profile: {
    name: String,
    contact: String,
    location: String,
  },
}, { timestamps: true });

// Method to set password
userSchema.methods.setPassword = async function(password) {
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(password, salt);
};

// Method to validate password
userSchema.methods.validatePassword = async function(password) {
  return bcrypt.compare(password, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
