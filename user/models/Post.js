const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    email: String,
    password: String,
    confirmPassword: String,
    phoneNumber: String,
    gender: String,
    firstName: String,
    lastName: String,
    resetToken: String,
    resetTimeout:Date
});

module.exports = mongoose.model('Post',PostSchema);