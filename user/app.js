const express = require ('express');
const app = express();
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv/config');

const logoutRoute = require('./routes/user/logout');
const forgotRoute = require('./routes/user/forgot');
const resetRoute = require('./routes/user/reset');
const loginRoute = require('./routes/user/login');
const getPostsRoute = require('./routes/user/getPosts');
const signupRoute = require('./routes/user/signup');
app.use(bodyparser.json());
app.use('/logout', logoutRoute);
app.use('/forgot', forgotRoute);
app.use('/reset', resetRoute);
app.use('/login', loginRoute);
app.use('/getPosts', getPostsRoute);
app.use('/signup', signupRoute);
app.get('/',(req,res)=>{
    res.send('We are on Home Page!!');
});
mongoose.connect(process.env.DB_CONNECTION,{ useNewUrlParser: true, useUnifiedTopology: true }, () => console.log('Connected to DB!'));
app.listen(3000);