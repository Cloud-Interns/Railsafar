const express = require('express');
const router = express.Router();
const User = require('../../models/User');
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
        const user = await User.findOne({email:mailOption.to});
        if(!user) return res.send('No such user exists!');
        user.resetToken = token;
        user.resetTimeout = Date.now() + 3600000;
        user.save();
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