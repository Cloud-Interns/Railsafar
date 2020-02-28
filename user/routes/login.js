const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

router.post('/', async (req,res) =>{
    try{
        const post = await Post.findOne({email : req.body.email});
        if(!post) return res.send('Invalid Username');
        const isMatched = await bcrypt.compare(req.body.password,post.password);
        if(!isMatched) return res.send('Invalid Password');    
        const token=jwt.sign({_id:post._id}, process.env.SECRET_KEY);
        post.sessionToken = token;
        post.save();
        res.send('Logged in!')
    }
    catch(err){
        res.send(err.message);
    }   
});

module.exports=router;