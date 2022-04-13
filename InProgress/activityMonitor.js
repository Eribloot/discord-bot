// admin command to view activity monitor db. useful to check for issues.
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Message } = require("discord.js");
const { activityMonitor } = require("../index.js");

const data = new SlashCommandBuilder()
    .setName("Activity Monitor")
    .setDescription("view activity of users.");




module.exports = {
  data: data,
  async execute(interaction)
  {
    const listEmbed = new MessageEmbed()

  }
}
