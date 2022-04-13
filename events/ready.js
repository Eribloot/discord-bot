// when client is ready, run this (once)
const { testingOn, guildId } = require("../config.json");
const { SlashCommandBuilder, time } = require("@discordjs/builders");
const { Permissions } = require("discord.js");

const { sequelize, Activity } = require("../index.js");

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
      const membersToStore = await server.members.fetch()
          .then(members => members.filter(member => !member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) && member.premiumSince === null && !member.user.bot))
          .then(members => members.filter(member => console.log(member.user.tag)));
      // sync db, add users to it
      await sequelize.sync();
      
      // --------INACTIVES TESTING--------
    }
  }
}