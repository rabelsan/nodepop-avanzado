/* eslint-disable no-undef */
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = mongoose.Schema({
  email: { type: String, unique: true, index: true },
  password: String
});

userSchema.statics.hashPassword = function(decryptedPassword) {
  return bcrypt.hash(decryptedPassword, 10);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
