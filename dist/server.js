"use strict";

const express = require('express');

const app = express();

const router = require("./modules");

const {
  PORT
} = require("./config");

const {
  sequelize
} = require("./lib/sequelize");

const socketIO = require('socket.io');

app.use(express.json());
sequelize.sync({
  force: false
}).then(() => console.log("connected")).catch(err => console.log(err));
app.use(router);
const server = app.listen({
  port: PORT
}, () => {
  console.log(PORT);
});
const io = socketIO(server);
module.exports = io;