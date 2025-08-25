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
const profileRoute = require('./routes/profileRoute');
const feedArticles = require('./routes/feedRoute');
const globalArticles = require('./routes/globalArticleRoute');
const dashBoard = require('./routes/dashBoardRoute');
const userRoute = require('./routes/userRoute');


app.use('/api/home', homeRoute);
app.use('/api/users', signUpRoute);
app.use('/api/users/login', loginRoute);

app.use('/api/articles/feed', authentication, feedArticles);//user feed

app.use('/api/articles', globalArticles );//get all articles, own articles, favorited articles, get comments


app.use('/api/article', authentication, articleRoute);// post 1 article, like article, post comment , delete article, update article, download article.
app.use('/api/tags', tagRoute);

app.use('/api/profiles',authentication, profileRoute);//follow author

app.use('/api/dashboard', dashBoard);

app.use('/api/user',authentication, userRoute);//get user

app.listen(5000, function () {
  console.log("server is running on port no. 5000");
})