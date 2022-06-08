const { Schema, model } = require('mongoose');

const prefixSchema = new Schema({
    guildID: {
        type: String,
        unique: true,
        require: true
    },
    newPrefix: {
        type: String,
        require: true
    }
})

module.exports = model("Prefixes", prefixSchema);