"use strict";

const { Users } = require("../../model/model");

const jwt = require("jsonwebtoken");

const { SECRET_KEY } = require("../../config");

module.exports = {
  GET_USERS: async (_, res) => {
    try {
      res.json(await Users.findAll());
    } catch (e) {
      console.log(e);
    }
  },
  REGISTER: async (req, res) => {
    try {
      const { name, surname, user_name, email, phone, password } = req.body;
      const isUserAvailable = await Users.findOne({
        where: {
          user_name,
        },
      });

      if (isUserAvailable) {
        res.status(401).json({
          status: "409 Conflict",
          message: "you already have account!",
        });
      } else {
        await Users.create({
          name,
          surname,
          user_name,
          email,
          phone,
          password,
        }); // save user

        const newUser = await Users.findOne({
          where: {
            user_name,
          },
        });
        const token = jwt.sign(
          {
            id: newUser.id,
            name: newUser.name,
          },
          SECRET_KEY
        ); // set token

        res.send(token);
      }
    } catch (e) {
      res.send(e);
    }
  },
  LOGIN: async (req, res) => {
    try {
      const { user_name, password } = req.body;
      const isUser = await Users.findOne({
        where: {
          user_name,
        },
      });

      if (!isUser) {
        // check that user has account
        res.status(401).json({
          status: "400 (Bad request)",
          message: "Username wrong",
        });
      } else if (isUser.password != password) {
        // check that password right
        res.status(400).json({
          status: "400 (Bad request)",
          message: "Password wrong!",
        });
      } else {
        const user = await Users.findOne({
          where: {
            user_name,
          },
        });
        const token = jwt.sign(
          {
            id: user.id,
            name: user.name,
          },
          SECRET_KEY
        ); // set token to login

        res.json(token);
      }
    } catch (e) {
      console.log(e);
    }
  },
  UPDATE_ACCOUNT: async (req, res) => {
    try {
      const { id, name, surname, user_name, email, phone, password } = req.body;
      const foundUser = Users.findOne({
        where: {
          id,
        },
      });

      if (
        foundUser.name == name ||
        foundUser.surname == surname ||
        foundUser.user_name == user_name ||
        foundUser.email == email ||
        foundUser.phone == phone ||
        foundUser.password == password
      ) {
        res.json("Change infos please!");
      } else {
        await Users.update(
          {
            name,
            surname,
            user_name,
            email,
            phone,
            password,
          },
          {
            where: {
              id,
            },
          }
        );
        res.json("ok");
      }
    } catch (e) {
      res.json(e.message);
    }
  },
};
