/**
* TODO: Inactive filter and kicking
* TODO: Selfies voting
* TODO: anon concerns
**/

// Require discord.js classes
import { Client, Intents } from "discord.js";
import { token } from "./config.json";

// Create new instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// when client is ready, run this (once)
client.once("ready", () => {
  console.log("ready!!");
})  

// Listener for commands
client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) return;

  //if name of a command is found, catch it and store into var
  const { commandName } = interaction;

  //respond according to name that is found
  if(commandName ==  "ping") {
    await interaction.reply("pong!");
  }
  else if (commandName == "server") {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal membersL ${interaction.guild.memeberCount}`);
  }
  else if(commandName == "user") {
    await interaction.reply(`Your tag: ${interation.user.tag}\nYour id: ${interaction.user.id}`)
  }
});

//Login to discord via token
client.login(token);



