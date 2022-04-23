// general listener for when command is used
const { testingOn } = require("../config.json");

if (!testingOn) {
  module.exports = {
    name: "interactionCreate",
    execute(interaction) {
      console.log(
        `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
      );
    },
  };
} else {
  module.exports = {
    name: "interactionCreate",
    execute(interaction) {
      if (interaction.isButton())
        console.log(
          `${interaction.user.tag} in #${interaction.channel.name} triggered a button!`
        );
      else
        console.log(
          `${interaction.user.tag} in #${interaction.channel.name} triggered an interaction.`
        );
    },
  };
}
