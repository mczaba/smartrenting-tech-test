import mysql from "mysql";

require("dotenv").config();

const dbConnect = mysql.createConnection({
  host: 'mariadb',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});

const dbQuery = (query) =>
  new Promise((resolve, reject) => {
    dbConnect.query(query, (err, res) => {
      try {
        if (err) throw err;
        resolve(res);
      } catch (error) {
        reject(error);
      }
    });
  });
export default { query: dbQuery, escapeString: mysql.escape };
