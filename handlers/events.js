const { Client } = require('discord.js');
const fs = require('fs');

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
    try {
        fs.readdirSync("./functions/events/").forEach((file) => {
            const events = fs.readdirSync("./functions/events/").filter((file) =>
              file.endsWith(".js")
            );
            for (let file of events) {
              let pull = require(`../functions/events/${file}`);
              if (pull.name) {
                client.events.set(pull.name, pull);
              }
            }
            console.log((`${file}  Events Loaded Successfullly`));
          });
    } catch (e) {
        console.log(e.message);
    }
}