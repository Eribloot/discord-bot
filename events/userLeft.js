// this emits when a user leaves the server
const { bold, userMention } = require("@discordjs/builders");
const { MessageEmbed }  = require("discord.js");

const { Users } = require("../data/dbObjects.js");

module.exports = {
  name: "guildMemberRemove",
    async execute(member) {

      const id = member.id;
      const username = member.user.tag;
      
      //get log channel
      const logChannel = await member.guild.channels.cache.get("742187165659693076");
      //leave log message
      const leaveLog = new MessageEmbed()
      .setColor("DARK_BUT_NOT_BLACK")
      .setDescription(`Taking one last look at my friend... ${bold(username)} ${userMention(id)}`)

      //remove user from database
      await Users.destroy({ where: { user_id: id } });

      logChannel.send({ embeds: [leaveLog] });

    },
}