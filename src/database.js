const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('sql7729847', 'sql7729847', 'DSpNPVvqBH', {
  host: 'sql7.freesqldatabase.com',
  dialect: 'mysql',
  port: 3306
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;
