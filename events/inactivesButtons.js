const { channelMention } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");
const { Users } = require("../data/dbObjects.js");

//dayjs and plugins to query timeframe
const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isButton()) return;

    //filter only buttons activated through the inactives command
    const filter = (i) =>
      i.customId === "inactives-yes" || i.customId === "inactives-no";

    // collector to catch which button the user clicks
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      componentType: "BUTTON",
      time: 15000,
    });

    // * reusing code in original command, unsure if there is a good workaround

    //get users from db
    const users = await Users.findAll({
      attributes: ["message_time", "user_id"],
    });
    const server = interaction.guild;

    //if yes, kick all users that were printed.
    collector.on("collect", async (i) => {
      if (i.customId === "inactives-yes") {
        //filter out users that haven't sent a message in 2 weeks, kick if yes
        users.forEach(async (u) => {
          const messageTime = dayjs(u.message_time, "x");
          const timeframe = dayjs().subtract(14, "day");
          if (messageTime.isBefore(timeframe))
            return await server.members.kick(u.user_id);
        });
        const listEmbed = new MessageEmbed()
          .setColor("DARK_BUT_NOT_BLACK")
          .setTitle("Inactives")
          .setDescription("Successfully removed inactive members.");

        await i.update({ embeds: [listEmbed], components: [] });
      }

      //if no, cancel
      if (i.customId === "inactives-no") {
        const listEmbed = new MessageEmbed()
          .setColor("DARK_BUT_NOT_BLACK")
          .setTitle("Inactives")
          .setDescription("Cancelled removal of inactive members.");

        console.log("user clicked no.");

        await i.update({ embeds: [listEmbed], components: [] });
      }
    });
  },
};
