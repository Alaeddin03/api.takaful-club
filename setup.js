
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Alaad003',
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
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   phone VARCHAR(10) NOT NULL,
//   busNumber VARCHAR(5) NOT NULL,
//   busLimit INT NOT NULL,
//   username VARCHAR(20) NOT NULL,
//   password VARCHAR(72) NOT NULL,
//   )`;
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
//     registrationDateTime DATETIME NOT NULL, 
//     limitOfParticipants INT, 
//     image VARCHAR(255) DEFAULT 'logo.svg')`;
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
//   gender VARCHAR(6) NOT NULL,
//   notes TEXT
//    )`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });


//  ------- Neighborhood -----------
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   var sql = `CREATE TABLE neighborhood (
//     id INT PRIMARY KEY,
//     name VARCHAR(50) NOT NULL,
//     sequence INT NOT NULL
//      )`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//  ------- Neighborhood -----------
// connection.connect((err) => {
//   if (err) throw err;
//   console.log('Connected!');
//   var sql = `CREATE TABLE neighborhood (
//   id INT PRIMARY KEY,
//   name VARCHAR(50) NOT NULL,
//   sequence INT NOT NULL
//    )`;
//   connection.query(sql, (err, result) => {
//     if (err) throw err;
//     console.log("Table created");
//   });
// });

//  ------- ProgramsStudents -----------
connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
  var sql = `CREATE TABLE programsStudents (
  programId INT,
  studentId INT,
  neighborhoodId INT,
  driverId INT,
  CONSTRAINT student_fk FOREIGN KEY (programId) REFERENCES programs(id),
  CONSTRAINT program_fk FOREIGN KEY (studentId) REFERENCES students(id),
  CONSTRAINT neighborhood_fk FOREIGN KEY (neighborhoodId) REFERENCES neighborhood(id),
  CONSTRAINT driver_fk FOREIGN KEY (driverId) REFERENCES driver(id),
  CONSTRAINT program_student_pk PRIMARY KEY (programId, studentId)
   )`;
  connection.query(sql, (err, result) => {
    if (err) throw err;
    console.log("Table created");
  });
});


