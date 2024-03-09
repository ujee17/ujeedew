import mysql from "mysql";

export const conn = mysql.createPool({
  connectionLimit: 10,
  host: "sql6.freemysqlhosting.net", // 144.155.166.177  sql6.freemysqlhosting.net
  // host :"127.0.0.1"
//  user: "root",// webcat_web4
 // password: "",// Lwc5i@4VxF#@k@
 // database: "id21933125_web4",//  webcat_id21933125_web4
  user: "sql6689814",// 
  password: "lY6JvEwf6M",// 
  database: "sql6689814",//  




}); 
