// Usage
// ping => responds with pong
// *Test command, testing if bot is running

const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("Replies with Pong");

module.exports = {
  data: data,
  async execute(interaction) {
    await interaction.reply("Im working correctly, bitch");
  },
};
