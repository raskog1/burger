const connection = require("./connection");

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

const orm = {
  // Select everything from the table
  selectAll: function (tableInput, cb) {
    const queryString = `SELECT * FROM ${tableInput}`;
    connection.query(queryString, (err, result) => {
      if (err) throw err;
      cb(result);
    });
  },

  // Insert one row into the table, specifying columns and values
  insertOne: function (tableInput, columns, values, cb) {
    const queryString = `INSERT INTO ${tableInput} (${columns}) VALUES (${values})`;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  // Update one row in the table, specifying where and the new value
  updateOne: function (tableInput, condition, value, cb) {
    // Have to use objToSql method to transition value to SQL sytax
    let queryString = `UPDATE ${tableInput} SET ${objToSql(value)} `;
    queryString += `WHERE ${condition}`;

    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },

  // Delete one row from the table, specifying where
  deleteOne: function (tableInput, condition, cb) {
    let queryString = `DELETE FROM ${tableInput} WHERE ${condition}`;
    connection.query(queryString, function (err, result) {
      if (err) throw err;
      cb(result);
    });
  },
};

module.exports = orm;
