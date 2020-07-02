const connection = require("./connection");
const express = require("express"); //might not be needed....

// Transitions an object into SQL syntax
function objToSql(ob) {
  const arr = [];

  for (const key in ob) {
    const value = ob[key];
    if (Object.hasOwnProperty.call(ob, key)) {
      if (typeof value === "string" && value.indexOf(" ") >= 0) {
        value = "'" + value + "'";
      }
      arr.push(key + "=" + value);
    }
  }
  return arr.toString();
}

// ORM created for tables with only one input column

const orm = {
  selectAll: function (tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput}`;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  insertOne: function (tableInput, column, value, cb) {
    const queryString = `INSERT INTO ${tableInput} (${column}) VALUES ("${value}");`;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  updateOne: function (tableInput, condition, value, cb) {
    // Have to use objToSql method to transition value to SQL sytax
    let queryString = `UPDATE ${tableInput} SET ${objToSql(value)} `;
    queryString += `WHERE ${condition}`;

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};

module.exports = orm;
