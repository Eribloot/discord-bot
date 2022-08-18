// file movement
const fs = require("node:fs");
const path = require("node:path");

// Require discord.js classes
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { token } = require('./config.json');

// Create new instance
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.DirectMessages, GatewayIntentBits.GuildMembers, ] });

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

// compiles events into execute function => allows to take multiple parameters
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}
// Collection to store commmands
client.commands = new Collection();
// Array of command files to read
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))
// Set each item in array as command in collection
for(const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath);
  // key => command name 
  // value => function of command
  client.commands.set(command.data.name, command);
}

// Listener for commands
client.on("interactionCreate", async interaction => {
  if(!interaction.isChatInputCommand()) return;

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
