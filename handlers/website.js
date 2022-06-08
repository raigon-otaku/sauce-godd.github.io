const express = require("express");
const app = express();
const port = process.env.PORT;
const path = require('path')
require('dotenv').config();

module.exports = () => {
    app.use(express.static('public'));
    
    app.get('/', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/index.html'))
      })
    app.get('/invite', function(req, res) {
      res.redirect(process.env.BOT_INV);
    })

    app.listen(port, () => console.log(`Sauce-GODD listening at http://localhost:${port}`))
    
}
