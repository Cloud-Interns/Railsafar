const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const verify = require('./verifyToken');

router.get('/', verify, async(req,res) => {
    const sessionToken = req.header('session-token');
    const token=jwt.sign(sessionToken, process.env.LOGOUT_KEY);
    res.header('session-token', token);
    res.send('Logged out!');
});

module.exports=router;