const client = require("../..");
const mongo = require('mongoose');
require('dotenv').config();
const { MONGO_URI } = process.env;

client.on('ready', async () => {
        mongo.connect(MONGO_URI, {
        keepAlive: true,
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
});