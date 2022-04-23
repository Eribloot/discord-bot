const Sequelize = require("sequelize");

const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "data/database.sqlite",
});

const Users = require("./models/Users.js")(sequelize, Sequelize.DataTypes);

const force = process.argv.includes("--force") || process.argv.includes("-f");

sequelize
  .sync({ force })
  .then(async () => {
    const users = [
      Users.upsert({
        username: "creature-tester#7213",
        user_id: "967172937687912468",
        last_message: "966047440228745278",
        personal_role: "",
      }),
    ];

    await Promise.all(users);
    console.log("Database synced.");

    sequelize.close();
  })
  .catch(console.error);
