const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/:pnr', async (req,res) => {
    try{
        const pnr=req.params.pnr;
        const api_key=process.env.API_KEY;
        console.log(pnr, api_key);
        const api_url ='https://api.railwayapi.com/v2/pnr-status/pnr/'+pnr+'/apikey/'+api_key+'/';
        const fetch_res = await fetch(api_url);
        const json = await fetch_res.json();
        res.send(json);
    }
    catch(err)
    {
        res.send(err.message);
    }    
});

module.exports=router;