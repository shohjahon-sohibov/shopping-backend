"use strict";

const express = require('express');

const route = express.Router();

const Users = require("./user/user.js");

const Cart = require("./cart/cart.js");

const Products = require("./product/product.js");

route.get('/', Users.GET_USERS) // show all user
.post('/register', Users.REGISTER) // sign up user
.post('/login', Users.LOGIN) // login user
.put('/update', Users.UPDATE_ACCOUNT) // update account
.post('/cart', Cart.NEW_ORDER) //  add cart
.post('/order', Products.NEW_PRODUCT); //  add product

module.exports = route;