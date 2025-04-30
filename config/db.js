const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    underscored: true,
    logging: true, // Turn off SQL logging
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Set to true if you have a trusted certificate
      },
    },
  }
);

module.exports = sequelize;
