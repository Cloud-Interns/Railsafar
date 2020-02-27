const jwt = require('jsonwebtoken');

module.exports=function(req,res,next){
    const token = req.header('session-token');
    if(!token) return res.send('Access Not Granted!');
    try{
        const verified = jwt.verify(token, process.env.SECRET_KEY);
        req.post=verified;
        next();
    }
    catch(err){
        res.send(err.message);
    }
}