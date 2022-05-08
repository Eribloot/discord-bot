// this emits when a user joins the server.
const { bold, userMention } = require("@discordjs/builders");
const { MessageEmbed }  = require("discord.js");
const { Users } = require("../data/dbObjects.js");
const { Channels } = require("../utils/getChannels.js")

module.exports = {
  name: "guildMemberAdd",
    async execute(member) {

      //get needed channels
      const logChannel = Channels.get("join-and-leaves");
      const genChannel = Channels.get("general");
      const rolesChannel = Channels.get("roles");
      const introChannel = Channels.get("introduction")

      const username = member.user.tag;
      const id = member.id;
      
      //join log
      const joinLog = new MessageEmbed()
      .setColor("DARK_BUT_NOT_BLACK")
      .setDescription(`${userMention(id)} ${bold(username)}, welcome to Intergalactica!`)


      await Users.create({
        username: username,
        user_id: id,
        message_time: member.joinedTimestamp,
      });

      logChannel.send({ embeds: [joinLog] });
      genChannel.send(`Welcome ${userMention(id)}! Make sure to pick some ${rolesChannel} and make an ${introChannel}`);
    },
}