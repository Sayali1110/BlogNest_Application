var express = require('express');
var app = express();

app.use(express.json()); 

require('./db');
require('./models/association'); 


const authentication = require('./middleware/authentication');

const homeRoute = require('./routes/homeRoute');
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const articleRoute = require('./routes/articleRoute');
const tagRoute = require('./routes/tagRoute')

app.use('/signUp', signUpRoute);
app.use('/login',authentication, loginRoute);
app.use('/',authentication, homeRoute); 

app.use('/article', authentication,articleRoute);
app.use('/tags', authentication, tagRoute )

app.listen(6000, function () {
  console.log("server is running on port no. 6000");
})