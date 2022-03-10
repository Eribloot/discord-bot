const { channelMention } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  execute(interaction) {
    if(!interaction.isButton()) return;

    const collector = interaction.channel.createMessageComponentCollector({ componentType: "BUTTON", time: 15000, maxComponents: 1 });

    collector.on("collect", async i => {
      if(i.customId === "Yes")
      {
        const listEmbed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle("Inactives")
        .setDescription("Successfully removed inactive members.");

        await i.update({ embeds:[listEmbed], components:[] });
      }
      if(i.customId === "No")
      {
        const listEmbed = new MessageEmbed()
        .setColor("DARK_BUT_NOT_BLACK")
        .setTitle("Inactives")
        .setDescription("Cancelled removal of inactive members.");

        await i.update({ embeds:[listEmbed], components:[] });
      }
        
    })
  }

}