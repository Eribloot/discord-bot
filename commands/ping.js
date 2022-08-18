// Usage
// ping => responds with pong
// *Test command, testing if bot is running

const { SlashCommandBuilder } = require("discord.js");
 
module.exports = {
  data: new SlashCommandBuilder()
.setName('ping')
.setDescription('Replies with Pong!'),

async execute(interaction) {
    await interaction.reply("Im working correctly, bitch");
  },
};
