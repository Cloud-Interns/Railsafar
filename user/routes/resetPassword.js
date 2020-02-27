const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { Validator } = require('node-input-validator');
const Post = require('../../models/Post');

router.post('/', verify, async (req,res) => {
    const post = await Post.findOne({email:req.header('email')});
    const salt = await bcrypt.genSalt(10);
    const validation= new Validator(req.body, 
    {
        newPassword: 'required|minLength:8|same:confirmPassword'
    });    
    validation.check().then((matched) => {
        if (!matched) return res.status(422).send(validation.errors);
    });
    const hashedPassword = await bcrypt.hash(req.body.newPassword,salt);
    const upd = await Post.updateOne(post,{$set:{password: hashedPassword}});
    if(!upd) return res.send('Invalid Credentials');
    return res.send('Updated!');
});

module.exports=router;