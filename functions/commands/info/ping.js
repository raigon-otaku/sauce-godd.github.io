const { Message, MessageEmbed, Client } = require("discord.js");

module.exports = {
    name: "ping",
    aliases: ['p'],
    permissions : ["SEND_MESSAGES"],
    categories: "info",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message) => {
        const pingmsg = new MessageEmbed()
            .setDescription(":hourglass: **Pinging...**")

        const Msg = await message.channel.send({embeds: [pingmsg]});

        const spingmsg = new MessageEmbed()
            .setDescription(`:ping_pong: **Pong!** ${Msg.createdTimestamp - message.createdTimestamp}ms`)

        setTimeout(function() { Msg.edit({embeds: [spingmsg]}); },3000)
    },
};