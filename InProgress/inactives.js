// Usage
// inactives => returns a list of users that are currently inactive on the server.
// prompts if the user wants to kick them;
// yes => kicks the users listed.
// no => stops the interaction.
const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");

const data = new SlashCommandBuilder()
    .setName("inactives")
    .setDescription("Get currently inactive members.")
    
module.exports = {
    data: data,
    async execute(interaction) {

        const listEmbed = new MessageEmbed()
            .setColor("DARK_BUT_NOT_BLACK")
            .setTitle("Inactives")
            .setDescription(inactives.join(", /n"));
        
        //Buttons
        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                    .setCustomId("Yes")
                    .setLabel("Yes")
                    .setStyle("SUCCESS"),
                new MessageButton()
                    .setCustomId("No")
                    .setLabel("No")
                    .setStyle("DANGER")
            );
        await interaction.reply({ embeds: [listEmbed], components: [row] });
    }
}