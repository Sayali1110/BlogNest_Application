const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: "localhost",
  dialect: "postgres",
  port: 5432,
  username: "postgres",
  password: "root",
  database: "blognest"
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection established successfully');
  })
  .catch((error) => {
    console.error('Not connected', error);
  });

module.exports = sequelize;