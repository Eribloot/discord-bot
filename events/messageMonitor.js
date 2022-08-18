// emitter for collecting user messages to monitor activity
const { inBotChannel, inServer, hasSpecialRole } = require("../utils/Messages");

module.exports = {
  name: "messageCreate",
  async execute(message) {
    //messages to ignore; if in bot channel, not server, or author is a bot
    if(inBotChannel(message) || !inServer(message) || message.author.bot) return;

    //if user is exempt
    if(hasSpecialRole(message))


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
