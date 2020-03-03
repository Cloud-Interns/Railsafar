const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    try{
        const noOfTickets = req.body.noOfTickets;
        console.log(noOfTickets);
    }
    catch(err)
    {
        res.send(err.message);
    }
});

module.exports=router;