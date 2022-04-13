/**
* TODO: Inactive filter and kicking --> whitelisted users list
* TODO: Selfies voting
* TODO: anon concerns
**/
// file movement, Sequelize
const fs = require("fs");
const Sequelize = require("sequelize");

// Require discord.js classes
const { Client, Collection, Intents } = require("discord.js");
const { token } = require('./config.json');
const { builtinModules } = require("module");

// Create new instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES, Intents.FLAGS.GUILD_MEMBERS, ] });

//db connection setup
const sequelize = new Sequelize("database", "user", "password", {
  host: "localhost",
  dialect: "sqlite",
  logging: false,
  storage: "database.sqlite",
});

//model setup
const Activity = sequelize.define("activity", {
  user: {
    type: Sequelize.STRING,
    unique: true,
    defaultValue: undefined
  },
  messageTime: Sequelize.STRING,
  inactive: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  } 
})
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));

// compiles events into execute function => allows to take multiple parameters
for (const file of eventFiles) {
	const event = require(`./events/${file}`);
	if (event.once) {
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
  if(!interaction.member.permissions.has("ADMINISTRATOR"))
    return await interaction.reply({ content: "You do not have permisson to access this command.", ephemeral: true});

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

// API detailed error logger
process.on("unhandledRejection", error => {
  console.error("unhandled promise rejection:", error);
});

//Login to discord via token
client.login(token);


module.exports = sequelize, Activity;
