'use strict'

const app = require('express')();

// Loading Process Env 
require('dotenv').config();

app.get('/', (req, res) => {
    res.send('Hello World!!!!');
});

app.listen(process.env.APP_HOST_PORT || 8000, (err) => {
    if(err) {
        return console.log("Failed to start the server!");
    }
    console.log("Successfully started the server!");
});
