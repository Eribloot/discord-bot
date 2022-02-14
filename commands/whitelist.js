//Usage
// whitelist => Display and interact with user whitelist exempt from inactivity rule.

const { SlashCommandBuilder } = require("@discordjs/builders");
const { guildId } = require("../config.json");
import { guild } from "../index.js";

const users = guild.members.fetch().then(members => {
  const ImportantUsers = members.filter()
})

const data = new SlashCommandBuilder()
  .setName("whitelist")
  .setDescription("displays whitelist of users exempt from inactivity rule.")