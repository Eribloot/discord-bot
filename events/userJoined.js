// this emits when a user joins the server.
const { bold, userMention, channelMention } = require("@discordjs/builders");
const { MessageEmbed }  = require("discord.js");
const { Users } = require("../data/dbObjects.js");

module.exports = {
  name: "guildMemberAdd",
    async execute(member) {

      //get needed channels
      const logChannel = await member.guild.channels.cache.get("742187165659693076");
      const genChannel = await member.guild.channels.cache.get("744650481682481233");
      const rolesChannel = await member.guild.channels.cache.get("742303560988885044");
      const introChannel = await member.guild.channels.cache.get("742567349613232249");

      const username = member.user.tag;
      const id = member.id
      
      //join log
      const joinLog = new MessageEmbed()
      .setColor("DARK_BUT_NOT_BLACK")
      .setDescription(`${userMention(id)}, ${bold(username)}  welcome to Intergalactica!`)


      await Users.create({
        username: username,
        user_id: id,
        message_time: member.joinedTimestamp,
      });

      logChannel.send({ embeds: [joinLog] });
      genChannel.send(`Welcome ${userMention(id)}! Make sure to pick some ${channelMention(rolesChannel)} and make an ${channelMention(introChannel)}`);
    },
}