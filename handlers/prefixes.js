const { Message, Client } = require("discord.js");
const { globalPrefix } = require('../assets/config/config.json');
const Prefixes = require('../assets/schema/guild-prefix-schema')

/**
   *
   * @param {Client} client
   * @param {Message} message
   */

module.exports = async (client, message, args) => {
    try {
        let prefix;
        let data = await Prefixes.findOne({
            guildID: message.guild.id
        })

        if(data === null) {
            prefix = globalPrefix
        } else {
            prefix = data.newPrefix
        }

        const args = message.content.slice(prefix.length).split(/ +/);
        const cmd = args.shift().toLowerCase();
        let command = client.commands.get(cmd);
        

        if(message.author.bot || !message.content.startsWith(prefix) || cmd.length === 0) return;

        if (!command) command = client.commands.get(client.aliases.get(cmd));

        command.run(client, message, args)

    } catch (e) {
        console.log(e);
    }
}