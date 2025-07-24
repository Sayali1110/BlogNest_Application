var express = require('express');
var app = express();
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());
const sequelize = require('./db');

require('./models/User');
require('./models/Article');
require('./models/Tag');
require('./models/Comment');

require('./models/association');

sequelize.sync()
  .then(() => {
    console.log("All models synced successfully");
  })


const authentication = require('./middleware/authentication');

const homeRoute = require('./routes/homeRoute');
const signUpRoute = require('./routes/signUpRoute');
const loginRoute = require('./routes/loginRoute');
const articleRoute = require('./routes/articleRoute');
const tagRoute = require('./routes/tagRoute');
const myArticlesRoute = require('./routes/myArticlesRoute');
const profileRoute = require('./routes/profileRoute');
const feedArticles = require('./routes/feedRoute');
const globalArticles = require('./routes/globalArticleRoute');


app.use('/api/home', homeRoute);
app.use('/api/users', signUpRoute);
app.use('/api/users/login', loginRoute);

//app.use('/api/myArticles',authentication, myArticlesRoute);//myArticles, favoriteArticles
app.use('/api/articles/feed', authentication, feedArticles);//user feed
app.use('/api/articles', globalArticles );//get all articles, comments


app.use('/api/article', authentication, articleRoute);// post 1 article, like article, post comment 
app.use('/api/tags', tagRoute);

app.use('/api/profiles',authentication, profileRoute);//follow service




app.listen(5000, function () {
  console.log("server is running on port no. 5000");
})