"use strict";

const {
  Cart
} = require("../../model/model");

module.exports = {
  NEW_ORDER: async (req, res) => {
    const {
      title,
      description,
      price
    } = req.body;
    const newOrder = await Cart.create({
      title,
      description,
      price
    });
    res.json(newOrder);
  }
};