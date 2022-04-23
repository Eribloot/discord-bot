// Usage
// inactives => returns a list of users that are currently inactive on the server.
// prompts if the user wants to kick them;
// yes => kicks the users listed.
// no => stops the interaction.
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const { Users } = require("../data/dbObjects.js");

//dayjs and plugins to query timeframe
const dayjs = require("dayjs");
const isBetween = require('dayjs/plugin/isBetween');
const customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
dayjs.extend(isBetween);

const data = new SlashCommandBuilder()
    .setName("inactives")
    .setDescription("Get currently inactive members.") 


module.exports = {
    data: data,
    async execute(interaction) {
        //get users from db
        const users = await Users.findAll({ attributes: ["message_time", "username"] });
        //filter out users that haven't sent a message in 2 weeks, return
        const usersList = users.map(u => {
            const messageTime = dayjs(u.message_time, "x");
            const timeframe = dayjs().subtract(14, "day");
            if(messageTime.isBefore(timeframe))
                return u.username;
          }).join("\n");

        //Embed
        const listEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle("Inactives")
            .setDescription(usersList);
        
        //Buttons
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("inactives-yes")
                    .setLabel("Yes")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("inactives-no")
                    .setLabel("No")
                    .setStyle("DANGER")
                    
            );
        await interaction.reply({ embeds: [listEmbed], components: [row] });
    }
}