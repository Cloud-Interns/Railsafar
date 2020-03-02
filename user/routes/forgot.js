const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const nodemailer = require('nodemailer');
const crypto = require('crypto');

router.post('/', async (req,res)=>{
    try{
        const transporter = nodemailer.createTransport({
            service : 'gmail',
            auth:{
                user: 'aleenmacwan7619@gmail.com',
                pass: process.env.PASSWORD
            }
        });
        const token = crypto.randomBytes(20).toString('hex');
        const mailOption={
            from:'aleenmacwan7619@gmail.com',
            to:req.body.email,
            subject:'Test',
            text:'Click the below link to reset your password'
            +'\nhttp://'+ req.headers.host +'/reset/'+token
        };
        const post = await Post.findOne({email:mailOption.to});
        if(!post) return res.send('No such user exists!');
        post.resetToken = token;
        post.resetTimeout = Date.now() + 3600000;
        post.save();
        transporter.sendMail(mailOption, (err,data)=>{
            if(err) return res.send('Error!');

            res.send('Mail sent!');
        });
    }
    catch(err){
        res.send(err.message);
    }
});

module.exports=router;