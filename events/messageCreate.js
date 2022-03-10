const { testingOn } = require("../config.json");
exports.activityMonitor = new Array();


if(testingOn)
{
  
  module.exports = {
    name: "messageCreate",
    async execute(message)
    {
      // get user that sent message
      // store as { userId: messageCreatedAt } if user is not admin, bot, server booster and message is not sent in bot channel, admin channel
      //if message with author exists already, replace old message
      //else, store new value
      const roles = message.member.roles.cache;
      const user = message.author.tag;
      if(roles.some(role => role.id === "742147647233720461" || role.id === "742243945693708381" || role.id === "742246061388726272") || message.channel.parentId === "742190224335044676" || message.channel.parentId === "742243893743190116")
        return;
      else
        activityMonitor.push({username: user, time: message.createdAt})
    }
  }
}