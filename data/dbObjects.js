const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "data/database.sqlite",
});

const Users = require("./models/Users.js")(sequelize, Sequelize.DataTypes);

// create relations for data between tables here

module.exports = { Users };