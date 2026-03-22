const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "mysql",          
  user: "root",
  password: "root123",
  database: "eventzen_auth",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});


pool.getConnection((err, connection) => {
  if (err) {
    console.error("DB connection failed:", err);
  } else {
    console.log("MySQL Connected ");
    connection.release();
  }
});

module.exports = pool;