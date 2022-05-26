// emitter for collecting user messages to monitor activity
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

    //if user is exempt, create user without message; "N/A" identifies exempt users
    if (message.member.permissions.has(Permissions.ALL) || message.member.premiumSince) {
      
      //if exempt user is already stored, change only time
      if(currentUser) {
        await Users.update(
          { message_time: "N/A" },
          { where: { user_id: message.author.id } }
        );
        return console.log("booster or admin, message updated to N/A.");
      }

      //if exempt user is not stored yet, create new entry without message time
      else
        return await Users.create({
          username: currentName,
          user_id: message.author.id,
        });
    }

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
