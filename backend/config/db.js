import mysql from "mysql";

const conConfig = {
  host: "ecom.mysql.database.azure.com",
  user: "shavin",
  password: "in21-s3-cs3043",
  database: "ecom",
  port: 3306,
  ssl: {
    // Enable SSL
    rejectUnauthorized: true, // Reject unauthorized connections (recommended)
    // Other SSL options go here
  },
};

const connection = mysql.createConnection(conConfig);

connection.connect((err) => {
  if (err) {
    console.log("Error connecting to Db");
    process.exit(-1);
  }
  console.log("Connection established");
});

const query = (sql, args) => {
  return new Promise((resolve, reject) => {
    connection.query(sql, args, (err, rows, fields) => {
      if (err) return reject(err);
      resolve(rows);
    });
  });
};

export default query;
