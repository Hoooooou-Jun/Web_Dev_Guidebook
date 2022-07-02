"use strict";

//모듈
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('config');
const app = express()

//라우팅
const home = require('./routes');

//웹세팅
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", home);

app.listen(config.get('server.port'), () => {
    console.log(`Server Running on ${config.get('server.port')} Port!`);
});

module.exports = app;
