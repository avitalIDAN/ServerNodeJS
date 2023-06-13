const mysql = require("mysql2");

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "211378658", //"password", // your password here
  port: 3306,
  database: "FullStackProject66", //- remove comment after first run
});

con.connect(async function (err) {
  if (err) throw err;
  console.log("Connected!");
});

function get(tableName, itemID = 0, moreTableName = "") {
  var sql;
  if (itemID == 0) {
    //and moreTableName==""
    sql = `SELECT * FROM ${tableName}`;
  } else {
    if (moreTableName == "") {
      sql = `SELECT * FROM ${tableName} WHERE id = ${itemID}`;
    } else {
      let col = tableName.slice(0, -1);
      col = col + "Id";
      sql = `SELECT * FROM ${moreTableName} WHERE ${col} = ${itemID}`;
    }
  }
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    return result;
  });
}
// function getAll(tableName) {
//   con.query(`SELECT * FROM ${tableName}`, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     return result;
//   });
// }
function put(tableName, data) {
  // Check if the updated member has a valid ID
  if (!data.id) {
    console.error("Updated member does not have a valid ID.");
    return;
  }

  // Construct the SQL query
  let sql = `UPDATE ${tableName} SET ? WHERE id = ?`;

  // Check if the ID already exists in the table
  let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
  con.query(checkSql, data.id, function (err, result) {
    if (err) throw err;

    if (result[0].count === 0) {
      console.log("No member with the specified ID exists.");
    } else {
      // Update the existing member in the table
      con.query(sql, [data, data.id], function (err, result) {
        if (err) throw err;
        console.log("Member updated successfully.");
      });
    }
  });
}
function post(tableName, data) {
  //check if data has id
  if (!data.id) {
    console.log("there is no id");
    return;
  }
  let sql = `INSERT INTO ${tableName} SET ?`;
  // בדיקה האם המזהה כבר קיים בטבלה
  let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
  con.query(checkSql, data.id, function (err, result) {
    if (err) throw err;

    if (result[0].count > 0) {
      console.log("A member with the same ID already exists.");
    } else {
      con.query(sql, data, function (err, result) {
        if (err) throw err;
        console.log("New member inserted successfully.");
      });
    }
  });
}
function deletee(tableName, itemID) {
  // Check if a valid ID is provided
  if (!itemID) {
    console.log("No valid ID provided.");
    return;
  }

  // Construct the SQL query
  let sql = `DELETE FROM ${tableName} WHERE id = ?`;

  // Check if a member with the specified ID exists
  let checkSql = `SELECT COUNT(*) AS count FROM ${tableName} WHERE id = ?`;
  con.query(checkSql, itemID, function (err, result) {
    if (err) throw err;

    if (result[0].count === 0) {
      console.log("No member with the specified ID exists.");
    } else {
      // Delete the member from the table
      con.query(sql, itemID, function (err, result) {
        if (err) throw err;
        console.log("Member deleted successfully.");
      });
    }
  });
}