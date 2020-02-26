const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');

router.post('/', async (req,res) =>{
    try{
        const post = await Post.findOne({email : req.body.email});
        if(!post) return res.send('Invalid Username');
        const isMatched = await bcrypt.compare(req.body.password,post.password);
        if(!isMatched) return res.send('Invalid Password');    
    }
    catch(err){
        res.send(err.message);
    }   
    res.send('Logged in!');
});

module.exports=router;