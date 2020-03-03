const express = require('express');
const router = express.Router();
const railway = require('railway-api');
railway.setApikey(process.env.API_KEY);

router.get('/', (req,res) => {
    railway.trainRoute('11463', (req,res)=>{});
});

module.exports=router;