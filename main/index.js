/**
* TODO: Inactive filter and kicking
* TODO: Selfies voting
* TODO: anon concerns
**/

// Require discord.js classes
const fs = require("fs");
import { Client, Collection, Intents } from "discord.js";
import { token } from "../config.json";



// Create new instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

// Array of event files to read
const eventFiles = fs.readdirSync("./events").filter(file => file.endsWith(".js"))

//Event handler
for(const file of eventFiles) {
  const event = require(`./events/${file}`);
  if(event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Collection to store commmands
client.commands = new Collection();
// Array of command files to read
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith('.js'))
// Set each item in array as command in collection
for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  // key => command name 
  // value => function of command
  client.commands.set(command.data.name, command);
}

// Listener for commands
client.on("interactionCreate", async interaction => {
  if(!interaction.isCommand()) return;

  // retrieve matching command in collection
  const command = client.commands.get(interaction.commandName);

  // if does not match any commands in collection, do nothing
  if(!command) return;

  // execution of command
  try {
    await command.execute(interaction);
  } catch(error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command.", ephemeral: true})
  }
  
});
//Login to discord via token
client.login(token);


