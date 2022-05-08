//get and add channels to collection to cache
const { Collection } = require("discord.js")
const Channels = new Collection();

function getChannels(server) {
  const idsToGet = ["742187165659693076", "742187165659693076", "742303560988885044", "742567349613232249", "945894412817424404", "863775839945621534", "863775516998107186", "777888951523606548"];

  idsToGet.forEach( id => {
    const channel =  server.channels.cache.get(id);
    const name = channel.name;

    Channels.set(name, channel);
  })
}

module.exports = { getChannels, Channels };

