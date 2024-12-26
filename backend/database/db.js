require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});
//connect mysql
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL');
});


// create table
connection.connect(function(err) {
    try{
      if (err) throw err;
  
      var sql = `
      CREATE TABLE IF NOT EXISTS USERS (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
      `;
          connection.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Table created");
      });
    } catch(error){
      console.error("Something went wrong.Table not created!")
    }
  });

  
module.exports = connection;