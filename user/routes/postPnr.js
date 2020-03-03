const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    try{
        const pnr = req.body.pnr;
        res.redirect('../getPnr/'+pnr);
    }
    catch(err){
        res.send('error:'+err.message);
    }
});

module.exports=router;