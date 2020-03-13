const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const cors = require('cors');

const app = express();

//It will look for PORT in env else will start on 4000
const PORT = process.env.PORT || 4000;

//Database connection
connectDB();

//enabling cors
app.use(cors);

//setting static folder for angular
app.use(express.static(path.join(__dirname,'angular-src')));

//Init Middleware
app.use(express.json({ extended:false})); 

//Registering Routes
app.use('/api/user',require('./routes/user'));
app.use('/api/user',require('./routes/auth'));

//Starting server 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})