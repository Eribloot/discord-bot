const { Permissions } = require("discord.js");
const { Users } = require("../data/dbObjects.js");
const { guildId } = require("../config.json");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    //if a bot or message is not in current server
    if (message.author.bot || message.guildId != guildId) return;

    // get info
    const currentUser = await Users.findOne({
      where: { user_id: message.author.id },
    });
    const currentName = message.author.tag;
    const messageCreated = message.createdTimestamp;

    //if user is exempt, skip
    if (
      message.member.permissions.has(Permissions.ALL) ||
      message.member.premiumSince
    )
      return console.log("this user is an admin or a booster.");

    //if user already exists
    if (currentUser) {
      await Users.update(
        { message_time: messageCreated },
        { where: { user_id: message.author.id } }
      );
      return console.log("Most recent message updated.");
    }

    //if user doesn't exist
    else
      return await Users.create({
        username: currentName,
        user_id: message.author.id,
        message_time: messageCreated,
      });
  },
};
