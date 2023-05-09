
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'takaful'
});

///////////////
// create DB //
///////////////
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   connection.query('CREATE DATABASE takaful', (err, result) => {
//     if (err) throw err;
//     console.log("Database created");
//   });
// });


//////////////////
// create table //
//////////////////
// ------- Drivers ----------
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   var sql = `CREATE TABLE drivers (
//   id INT NOT NULL AUTO_INCREMENT,
//   name VARCHAR(50) NOT NULL,
//   phone VARCHAR(10) NOT NULL,
//   busNumber VARCHAR(5) NOT NULL,
//   neighborhood VARCHAR(20) ,
//   username VARCHAR(20) NOT NULL,
//   password VARCHAR(30) NOT NULL,
//   PRIMARY KEY (id) )`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

// ------- Programs -------------
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   var sql = `CREATE TABLE programs (
//     id INT AUTO_INCREMENT PRIMARY KEY,
//     title VARCHAR(50) NOT NULL, 
//     description TEXT, 
//     dateTime DATETIME NOT NULL, 
//     regestrationDateTime DATETIME NOT NULL, 
//     limitOfParticipants INT, 
//     image VARCHAR(255))`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//  ------- Students -----------
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   var sql = `CREATE TABLE students (
//   id INT PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   phone VARCHAR(10) NOT NULL,
//   age INT NOT NULL,
//   nationality VARCHAR(20) NOT NULL,
//   neighborhood VARCHAR(20) ,
//   programIDs INT,
//   notes TEXT,
//   Constraint programIDs_FK FOREIGN KEY (programIDs) REFERENCES programs(id)
//    )`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });


