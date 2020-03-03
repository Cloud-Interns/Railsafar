const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const verify = require('./verifyToken');
const { Validator } = require('node-input-validator');

router.post('/', verify, async (req,res)=>{
    try{
        const user = await User.findOne({email : req.body.email});
        if(!user) return res.send('Invalid Username');
        const isMatched = await bcrypt.compare(req.body.password,user.password);
        if(!isMatched) return res.send('Invalid Password');

        reset(req,res,user);
    }
    catch(err){
        res.send(err.message);
    }
});

router.get('/:token', async (req,res)=>{
    try{
        const user = await User.findOne({resetToken:req.params.token});
        if(!user) return res.send('No results found!');
        if(Date.now()>user.sessionTimeout) return res.send('Timeout!');
        
        reset(req,res,user);
    }
    catch(err){
        res.send(err.message);
    }
});

async function reset(req,res,user)
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
        const upd = await User.updateOne(user,{$set:{password: hashedPassword}});
        if(!upd) return res.send('Invalid Credentials');
        return res.send('Updated!');
    }
    catch(err){
        res.json({message:err});
    }
}
module.exports=router;