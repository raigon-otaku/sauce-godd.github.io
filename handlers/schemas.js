const { Client } = require('discord.js');
const fs = require('fs');

/**
   *
   * @param {Client} client
   */

module.exports = (client) => {
    try {
        fs.readdirSync("./assets/schema/").forEach((file) => {
            const events = fs.readdirSync("./assets/schema/").filter((file) =>
              file.endsWith(".js")
            );
            for (let file of events) {
              let pull = require(`../assets/schema/${file}`);
              if (pull.name) {
                client.events.set(pull.name, pull);
              }
            }
            console.log((`${file}  Schemas Loaded Successfullly`));
          });
    } catch (e) {
        console.log(e.message);
    }
}