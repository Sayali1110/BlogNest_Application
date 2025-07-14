var express = require('express');
var app = express();

const sequelize = require('./db');

require('./models/User');
require('./models/Article');
require('./models/Tag');

require('./models/association');

sequelize.sync({ force: true })
  .then(() => {
    console.log("All models synced successfully");
  })

app.use(express.json());
const authentication = require('./middleware/authentication');

const homeRoute = require('./routes/homeRoute');
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const articleRoute = require('./routes/articleRoute');
const tagRoute = require('./routes/tagRoute')

app.use('/', homeRoute);
app.use('/signUp', signUpRoute);
app.use('/login', authentication, loginRoute);
app.use('/article', articleRoute);
app.use('/tags', tagRoute)

app.listen(6000, function () {
  console.log("server is running on port no. 6000");
})