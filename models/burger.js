const orm = require("../config/orm");

// Specifying tableInput for all orm methods in this model
const burger = {
  show: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },

  create: function (columns, values, cb) {
    orm.insertOne("burgers", columns, values, function (res) {
      cb(res);
    });
  },

  update: function (condition, value, cb) {
    orm.updateOne("burgers", condition, value, function (res) {
      cb(res);
    });
  },

  delete: function (condition, cb) {
    orm.deleteOne("burgers", condition, function (res) {
      cb(res);
    });
  },
};

module.exports = burger;
