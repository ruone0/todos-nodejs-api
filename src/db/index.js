import mysql from "mysql";
import { dbConfig } from "../configs/db.config.js";

// 连接mysql
function connect() {
  const { host, user, password, database } = dbConfig;
  return mysql.createConnection({
    host,
    user,
    password,
    database,
  });
}

// 新建查询连接
function querySql(sql) {
  const conn = connect();
  return new Promise((resolve, reject) => {
    try {
      conn.query(sql, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      });
    } catch (error) {
      reject(e);
    } finally {
      // 释放连接
      conn.end();
    }
  });
}


// 查询一条语句
function queryOne(sql) {
  return new Promise((resolve, reject) => {
    querySql(sql).then(res => {
      console.log('res===',res)
      if (res && res.length > 0) {
        resolve(res);
      } else {
        resolve(null);
      }
    }).catch(err => {
      reject(err);
    })
  })
}

export { querySql, queryOne };
