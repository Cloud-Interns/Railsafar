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

        reset(req,res,post);
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
        
        reset(req,res,post);
    }
    catch(err){
        res.send(err.message);
    }
});

async function reset(req,res,post)
{
    try{
        const salt = await bcrypt.genSalt(10);
        const validation= new Validator(req.body, 
        {
            newPassword: 'required|minLength:8|same:confirmPassword'
        });    
        validation.check().then((matched) => {
            if (!matched) return res.send(validation.errors);
        });
        const hashedPassword = await bcrypt.hash(req.body.newPassword,salt);
        const upd = await Post.updateOne(post,{$set:{password: hashedPassword}});
        if(!upd) return res.send('Invalid Credentials');
        return res.send('Updated!');
    }
    catch(err){
        res.json({message:err});
    }
}
module.exports=router;