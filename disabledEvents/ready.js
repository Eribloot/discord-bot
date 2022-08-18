// when client is ready, run this (once)
const { guildId } = require("../config.json");
const { Users } = require("../data/dbObjects.js");
const { getChannels } = require("../utils/getChannels");

module.exports = {
  name: "ready",
   once: true,
  execute(client) {
    const server = client.guilds.cache.get(guildId);
    console.log(`Server: ${server.name}`);
    console.log(`Member Count: ${server.memberCount}`);

    getChannels(server);
    console.log("Channels to use successfully cached.")

    console.log(`Ready! Logged in as ${client.user.tag}`);
  },
};
