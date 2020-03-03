const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req,res) => {
    const train_number=req.body.train_number;
    const api_key=process.env.API_KEY;
    console.log(train_number, api_key);
    const api_url ='https://api.railwayapi.com/v2/route/train/'+train_number+'/apikey/'+api_key+'/';
    const fetch_res = await fetch(api_url);
    const json = await fetch_res.json();
    res.json(json);
});

module.exports=router;