const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { Validator } = require('node-input-validator');
const bcrypt = require('bcryptjs');

router.post('/', async (req,res)=>{
    try{
        const user = await User.findOne({email: req.body.email});
        if(user) return res.send('User already exists!');
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password,salt); 
    
        const validation= new Validator(req.body, 
        {
            email : 'email|required|minLength:6',
            password: 'required|minLength:8|same:confirmPassword',
            firstName: 'required',
            lastName: 'required',
            gender: 'required',
            phoneNumber: 'required|minLength:10'
        });    
        validation.check().then((matched) => {
            if (!matched) return res.status(422).send(validation.errors);
        
            const user = new User({
                email : req.body.email,
                password: hashedPassword,
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                gender: req.body.gender,
                phoneNumber: req.body.phoneNumber    
            });
            user.save()
            .then(savedPost => {
            res.json(savedPost.email);
            })
        });
    }
    catch(err){
        res.send(err.message);
    }
});

module.exports= router;