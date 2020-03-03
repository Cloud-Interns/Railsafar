const jwt = require('jsonwebtoken');
const User = require('../../models/User');

module.exports=function(req,res,next){
    const token = req.header('sessionToken');
    if(!token) return res.send('Access Not Granted!');
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.user=verified;
        next();
    }
    catch(err){
        res.send('Invalid Token!')
    }
}