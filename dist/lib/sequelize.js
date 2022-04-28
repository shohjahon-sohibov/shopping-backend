"use strict";

const {
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:1@localhost:5432/urgaz');
module.exports = {
  sequelize,
  DataTypes
};