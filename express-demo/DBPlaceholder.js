export function get(tableName, itemID = 0, moreTableName = "") {
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

export function getAll(type){

}

export function getOne(type, id){

}

export function addOne(type, object){

}

export function deleteOne(type, id){

}

export function updateOne(type, object){

}

export function foundOne(type, id){

}