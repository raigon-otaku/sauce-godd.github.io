const { Message, Client } = require("discord.js");

module.exports = {
    name: "help",
    aliases: ['h'],
    permissions : ["SEND_MESSAGES"],
    categories: "info",
    /**
     *
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */
    run: async (client, message) => {
        //
    },
};