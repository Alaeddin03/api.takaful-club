
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password'
});

///////////////
// create DB //
///////////////
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  connection.query('CREATE DATABASE takaful', (err, result) => {
    if (err) throw err;
    console.log("Database created");
  });
});



//////////////////
// create table //
//////////////////
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   var sql = 'CREATE TABLE programs (id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(50), description TEXT, dateTime DATETIME, regestrationDateTime DATETIME, limitOfParticipants INT, image VARCHAR(255))';
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });