// admin command to view activity monitor db. useful to check for issues.
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Users } = require("../data/dbObjects.js");
const dayjs = require("dayjs");

const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat)

const data = new SlashCommandBuilder()
    .setName("user-data")
    .setDescription("display information stored on users.");

module.exports = {
  data: data,
  async execute(interaction)
  {
    //get info to display 
  const users = await Users.findAll({ attributes: ["username", "message_time"]});

  const usersList = users.map(u => {
    const timestamp = dayjs(u.message_time, "x").format("YYYY-MM-DD");
     return {name: u.username, value: timestamp};
    });

    const Embed = {
     color: 0x7b35a3,
     title: "User Data",
     fields: usersList,
   };

    await interaction.reply({ embeds: [Embed] });
  }
}
