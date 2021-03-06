// Import necessary classes
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
// Import token, client, and server info
const { clientId, guildId, token } = require("./config.json");

// Commands are mapped to json file
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"))

for(const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
}

// create rest object to register commands
const rest = new REST({ version: '9' }).setToken(token);


// deploy commands
( async () => {
  try {
    console.log("Started refreshing application (/) commands.")

    await rest.put(
      Routes.applicationGuildCommands(clientId, guildId),
      { body: commands },
    );
    console.log("application (/) commands successfully reloaded.");
  } catch(error) {
    console.error(error);
  }
})();
