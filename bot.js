const {Client, Collection, Intents} = require('discord.js');
const dotenv = require('dotenv');
const fs = require('fs');
const website = require ("./handlers/website");

dotenv.config();
website();

const client = new Client({
    messageCacheLifetime: 60,
    fetchAllMembers: false,
    messageCacheMaxSize: 10,
    restTimeOffset: 0,
    restWsBridgetimeout: 100,
    shards: "auto",
    allowedMentions: {
        parse: ["roles", "users", "everyone"],
        repliedUser: true,
    },
    partials: ["MESSAGE", "CHANNEL", "REACTION"],
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS
    ],
});

module.exports = client;

client.commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();
client.cooldowns = new Collection();
client.categories = fs.readdirSync("./functions/commands/");

["commands", "events"].forEach((handler) => {
    require(`./handlers/${handler}`)(client)
})

client.on('messageCreate', message =>{
    require(`./handlers/prefixes`)(client, message)
});

client.login(process.env.DISCORD_TOKEN);