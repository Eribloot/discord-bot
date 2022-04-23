// Usage
// echo -> echo's user's message through bot

const { SlashCommandBuilder } = require("@discordjs/builders");

const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("repeat a phrase through the bot.")
  .addStringOption(option =>
    option
      .setName("input")
      .setDescription("the input to echo")
      .setRequired(true));


module.exports = {
  data: data,
  async execute(interaction) {
    await interaction.reply(interaction.options.getString("input"));
  }
}
