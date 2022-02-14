// Usage
// inactives => returns a list of users that are currently inactive on the server.
// prompts if the user wants to kick them;
// yes => kicks the users listed.
// no => stops the interaction.
const { SlashCommandBuilder } = require("@discordjs/builders");
const { Guild } = require("discord.js");

const dayjs = require("dayjs");

const filterRoles = ["Admin", "Bot", "Rocket Boosters"];

//Guild.members.fetch().then(fetchedMemebers => {
//  const inactiveMembers = fetchedMembers.filter()
//})

const data = new SlashCommandBuilder()
    
