"use strict";

const {
  sequelize,
  DataTypes
} = require("../lib/sequelize"); // =================
// ======  USERS ===========
// =================


const Users = sequelize.define('users', {
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 1,
      max: 64
    }
  },
  surname: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 1,
      max: 64
    }
  },
  user_name: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
      max: 64
    }
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
      max: 64
    },
    unique: {
      args: true,
      msg: 'Email address already in use!'
    }
  },
  phone: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: {
      args: true,
      msg: 'Phone address already in use!'
    }
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
    validator: {
      min: 4
    }
  }
});
const Cart = sequelize.define('carts', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
      max: 64
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
      max: 256
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1000
    }
  }
});
const Products = sequelize.define('products', {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
      max: 64
    }
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      min: 3,
      max: 256
    }
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});
module.exports = {
  Users,
  Cart,
  Products
};