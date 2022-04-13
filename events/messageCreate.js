const { testingOn } = require("../config.json");
const { Permissions } = require("discord.js");
const { Activity } = require("../index.js");

const dayjs = require("dayjs");
const isBetween = require("dayjs/plugin/isBetween");
dayjs.extend(isBetween);

if(testingOn)
{
  module.exports = {
    name: "messageCreate",
    async execute(message)
    {
      
    }
  }
}