const orm = require("../config/orm");

const burger = {
  show: function (cb) {
    orm.selectAll("burgers", function (res) {
      cb(res);
    });
  },

  create: function (column, value, cb) {
    orm.insertOne("burgers", column, value, function (res) {
      cb(res);
    });
  },

  update: function (condition, value, cb) {
    orm.updateOne("burgers", condition, value, function (res) {
      cb(res);
    });
  },
};

module.exports = burger;
