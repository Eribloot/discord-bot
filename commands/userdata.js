// admin command to view activity monitor db. useful to check for issues.
const { SlashCommandBuilder, codeBlock } = require("@discordjs/builders");
const { Users } = require("../data/dbObjects.js");
const dayjs = require("dayjs");

const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

const data = new SlashCommandBuilder()
  .setName("user-data")
  .setDescription("display information stored on users.")
  .addIntegerOption(option => 
    option.setName("page")
      .setDescription("page number of the list.")
      .setRequired(false));

module.exports = {
  data: data,
  async execute(interaction) {
    //get info to display
    const users = await Users.findAll({
      attributes: ["user_id", "username", "message_time"],
    });

    const usersList = users.map((u) => {
      const messageTime = dayjs(u.message_time, "x").format("YYYY-MM-DD");
      const data = {
        user_id: u.user_id,
         username: u.username,
          message_time: messageTime,
        };

        return JSON.stringify(data, null, 4);
    });

    switch(interaction.options.getInteger("page"))
    {
      default:
      case 1:
         await interaction.reply(codeBlock("js", usersList.slice(0, 10)));
         break;
      case 2: 
        await interaction.reply(codeBlock("js", usersList.slice(10, 20)));
        break;
      case 3:
        await interaction.reply(codeBlock("js", usersList.slice(20, 30)));
        break;
    }
  },
};
