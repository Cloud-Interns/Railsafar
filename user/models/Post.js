const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String,
    phoneNumber: Number,
    gender: String,
    firstName: String,
    lastName: String,
    sessionToken: String,
    resetToken: String,
    resetTimeout:Date
});

module.exports = mongoose.model('Post',PostSchema);