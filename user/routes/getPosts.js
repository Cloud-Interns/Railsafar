const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const verify = require('./verifyToken');

router.get('/', verify, async (req,res) => {
    try{
        const posts = await Post.find(); 
        res.json(posts);
    }
    catch(err){
        res.json({message:err});
    }
});

router.get('/:email', verify, async (req,res) => {
    try{
        const post = await Post.findOne({email:req.params.email});
        res.json(post);
    }
    catch(err){
        res.json({message:err});
    }
}); 
module.exports=router;