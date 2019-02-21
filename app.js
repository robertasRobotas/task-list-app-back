const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Keys = require('./secretKey');

const app = express();

const userRoute = require('./api/routes/user');
const listRoute = require('./api/routes/list');

mongoose.connect('mongodb://'+Keys.mongoose.userID+':'+Keys.mongoose.password+'@ds123624.mlab.com:23624/to-do',
    { useNewUrlParser: true })
    .then(console.log('connected'))
    .catch(err=>{
        console.log('xxxxxxxxxxxxxxxxxx');
        console.log(err);
    });

    app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended : false}));
app.use(bodyParser.json());

app.use((req, res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

app.use('/user',userRoute );
app.use('/list',listRoute );

module.exports = app;