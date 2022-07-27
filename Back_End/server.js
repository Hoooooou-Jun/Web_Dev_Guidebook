"use strict";

const express = require('express');
const bodyParser = require('body-parser');
const config = require('config');
const cors = require('cors');
const { sequelize } = require('./src/utils/connect');
const authRouter = require('./src/routes/auth');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/auth", authRouter);
app.use(express.static(path.join(__dirname, '../Front_End/build')));

app.listen(config.get('server.port'), () => { // 서버 연결
    console.log(`Server Running on ${config.get('server.port')} Port!`);
});

sequelize.sync({ force: true }).then(() => {
    console.log("Success connecting DB");
}).catch((err) => {
    console.error(err);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_End/build/index.html'));
});