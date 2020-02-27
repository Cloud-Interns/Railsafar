const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');

router.post('/', verify, async (req,res)=>{
    try{
        const post = await Post.findOne({email : req.body.email});
        if(!post) return res.send('Invalid Username');
        const isMatched = await bcrypt.compare(req.body.password,post.password);
        if(!isMatched) return res.send('Invalid Password');

        agree(req,res,post);
    }
    catch(err){
        res.send(err.message);
    }
});

router.get('/:token', async (req,res)=>{
    try{
        const post = await Post.findOne({resetToken:req.params.token});
        if(!post) return res.send('No results found!');
        if(Date.now()>post.sessionTimeout) return res.send('Timeout!');
        
        agree(req,res,post);
    }
    catch(err){
        res.send(err.message);
    }
});

function agree(req,res,post){
    res.send('Are you really '+post.firstName+'?');
    //two buttons with yes and no values, on clicking yes it will redirect to resetPassword page, on clicking no will got to home page.
    const boolean=req.body.answer;
    if(boolean==true){
        return res.header('email', post.email);
    }
    else return res.send('Go Back!');
}
module.exports=router;