const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req,res) => {
    try{
        const source= req.body.source;
        const destination=req.body.destination;
        const date=req.body.date;
        const api_key=process.env.API_KEY;
        console.log(source, destination, date, api_key);
        const api_url ='https://api.railwayapi.com/v2/between/source/'+source+'/dest/'+destination+'/date/'+date+'/apikey/'+api_key+'/';
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