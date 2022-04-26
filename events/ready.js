// when client is ready, run this (once)
const { testingOn, guildId } = require("../config.json");
const { Users } = require("../data/dbObjects.js");

if (!testingOn) {
  module.exports = {
    name: "ready",
    once: true,
    execute(client) {

      console.log(`Ready! Logged in as ${client.user.tag}`);

    },
  };
}

else {
  module.exports = {
    name: "ready",
    once: true,
     async execute(client) {

      const server = client.guilds.cache.get(guildId);
      console.log(`Server: ${server.name}`);
      console.log(`Member Count: ${server.memberCount}`);
      // --------INACTIVES TESTING--------
    }
  }
}