const express = require('express');
const connectDB = require('./config/db');

const app = express();

//It will look for PORT in env else will start on 4000
const PORT = process.env.PORT || 4000;

//Database connection
connectDB();

//Init Middleware
app.use(express.json({ extended:false})); 

//Registering Routes
app.use('/api/user',require('./routes/user'));
app.use('/api/user',require('./routes/auth'));

//Starting server 
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})