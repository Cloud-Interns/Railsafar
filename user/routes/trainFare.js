const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req,res) => {
    try{
        const train_number= req.body.train_number;
        const source= req.body.source;
        const destination=req.body.destination;
        const age=req.body.age;
        const pref=ref.body.pref;
        const quota=req.body.quota;
        const date=req.body.date;
        const api_key=process.env.API_KEY;
        console.log(train_number, source, destination, age, pref, quota, date, api_key);
        const api_url ='https://api.railwayapi.com/v2/fare/train/'+train_number+'/source/'+station_code+'/dest/'+destination+'/age/'+age+'/pref/'+pref+'/quota/'+quota+'/date/'+date+'/apikey/'+api_key+'/';
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