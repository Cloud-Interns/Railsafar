const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req,res) =>{
    try{
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.send('Invalid Username');
        const isMatched = await bcrypt.compare(req.body.password,user.password);
        if(!isMatched) return res.send('Invalid Password');    
        const token=jwt.sign({_id:user._id}, process.env.SECRET_KEY);
        user.sessionToken = token;
        user.save();
        res.set({'sessionToken':token});
        res.send('Logged in!')
    }
    catch(err){
        res.send(err.message);
    }   
});

module.exports=router;