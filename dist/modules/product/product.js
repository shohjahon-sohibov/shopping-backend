"use strict";

const {
  Products,
  Cart
} = require("../../model/model");

const io = require("../../server.js");

module.exports = {
  NEW_PRODUCT: async (req, res) => {
    try {
      const {
        title,
        description,
        amount,
        price
      } = req.body;
      await Products.create({
        title,
        description,
        amount,
        price
      });
      await Cart.destroy({
        where: {
          title
        }
      });
      io.on('connection', socket => {
        socket.on('new-order', () => {
          socket.broadcast.emit('order-completed', {
            message: 'Your order is received'
          });
        });
      });
      res.json("Your order is received");
    } catch (e) {
      console.log(e);
    }
  }
};