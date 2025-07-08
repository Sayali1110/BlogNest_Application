var express = require('express');
var app = express();

app.use(express.json()); 

require('./db');

const authentication = require('./middleware/authentication');

const homeRoute = require('./routes/homeRoute');
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute')

app.use('/signUp', signUpRoute);
app.use('/login',authentication, loginRoute);
app.use('/', authentication, homeRoute); 

app.listen(6000, function () {
  console.log("server is running on port no. 6000");
})