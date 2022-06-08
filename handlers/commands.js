const { Client } = require('discord.js');
const fs = require('fs');
require("./prefixes")

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
    try {
        let command = 0;
        fs.readdirSync("./functions/commands").forEach(cmd => {
        
            let commands = fs.readdirSync(`./functions/commands/${cmd}/`).filter((file) => file.endsWith(".js"));
            for (cmds of commands) {
                let pull = require(`../functions/commands/${cmd}/${cmds}`);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                    command++
                } else {
                    console.log(`${cmds} Command is not Ready`);
                    continue;
                }
                if (pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name));

            }
        })
        console.log(`${command} commands Loaded`);
    } catch (e) {
        console.log(e.message);
    }
}