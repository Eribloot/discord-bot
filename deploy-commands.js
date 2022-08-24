// Import necessary classes
const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord.js");
// Import token, client, and server info
const { clientId, guildId, token } = require("./config.json");

// Commands are mapped to json file
const commands = [];
const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith(".js"))

for(const file of commandFiles) {
  const filePath = path.join(commandsPath, file)
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

// create rest object to register commands
const rest = new REST({ version: '10' }).setToken(token);

// deploy commands
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
    .then(() => console.log("successfully registered commands."))
    .catch(console.error);