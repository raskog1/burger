const connection = require("./connection");
const express = require("express"); //might not be needed....

// Adds quotes to our results for easy input into mySQL db
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
    const queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  insertOne: function (tableInput, column, value, cb) {
    //const stringValue = objToSql(value);
    const queryString = `INSERT INTO ${tableInput} (${column}) VALUES ("${value}");`;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  updateOne: function (tableInput, condition, value, cb) {
    let queryString = `UPDATE ${tableInput} SET ${value} `;
    queryString += `WHERE ${condition}`;
    if (err) throw err;
    cb(result);
  },
};

module.exports = orm;
