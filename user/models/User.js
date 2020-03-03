const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String,
    phoneNumber: Number,
    gender: String,
    firstName: String,
    lastName: String,
    sessionToken: String,
    resetToken: String,
    resetTimeout: Date,
    dateOfBirth: Date
});

module.exports = mongoose.model('User',UserSchema);