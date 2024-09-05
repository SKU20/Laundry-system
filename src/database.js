const { Sequelize } = require('sequelize');


const sequelize = new Sequelize(
  process.env.DB_DATABASE || 'laundry_db',
  process.env.DB_USERNAME || 'root',
  process.env.DB_PASSWORD || 'baza',
  {
    host: process.env.DB_HOST || '127.0.0.1', 
    dialect: 'mysql',
    logging: false 
  }
);

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
