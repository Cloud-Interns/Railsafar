const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req,res) => {
    try{
        const train_number= req.body.train_number;
        const station_code=req.body.station_code;
        const date=req.body.date;
        const api_key=process.env.API_KEY;
        console.log(train_number, station_code, date, api_key);
        const api_url ='https://api.railwayapi.com/v2/live/train/'+train_number+'/station/'+station_code+'/date/'+date+'/apikey/'+api_key+'/';
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