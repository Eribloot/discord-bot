const { guildId } = require("../config.json")
const { Permissions } = require("discord.js");

//checks if the message is located in a bot channel, for tracking.
export function inBotChannel(messageId)
{
  const channel = messageId.channel.name;
  return (channel == "bot-spam" || channel == "music-vc");
}

// check if message is in correct server
export function inServer(messageId)
{
 return messageId.guildId === guildId;
}

// check if message author is an Admin or Server Booster
export function hasSpecialRole(messageId)
{
  return messageId.member.permissions.has(Permissions.ALL) || messageId.member.premiumSince;
}