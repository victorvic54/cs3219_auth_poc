const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: { type: String, required: true, trim: true, min: 6, max: 255 },
  password: { type: String, required: true, trim: true, min: 6, max: 1024 },
  permissionLevel: { type: String, required: true }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;