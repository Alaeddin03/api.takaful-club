const db = require('./db');
const helper = require('../helper');

async function getPrograms() {
  const rows = await db.query(
    `SELECT id, title, description, dateTime, registrationDateTime, limitOfParticipants, image 
    FROM programs`
  );
  const programs = helper.emptyOrRows(rows);

  return {
    programs
  }
}


async function getCurrentPrograms() {
  // Get the current date/time in ISO format
  const currentDate = new Date().toISOString();
  const rows = await db.query(
    `SELECT id, title, description, dateTime, registrationDateTime, limitOfParticipants, image
      FROM programs
      WHERE registrationDateTime >= '${currentDate}'
      ORDER BY registrationDateTime ASC
      `
  );
  const programs = helper.emptyOrRows(rows);
  return {
    programs
  };
}


async function getProgramById(id) {
  const rows = await db.query(
    `SELECT id, title, description, dateTime, registrationDateTime, limitOfParticipants, image
    FROM programs
    WHERE id = ${id}`
  );
  const program = helper.emptyOrRows(rows);
  return {
    program
  };
}

async function createProgram(program) {

  let columnString = '';
  let valueString = '';
  let values = [];
  for (let key in program) {
    columnString += `${key}, `;
    valueString += `?, `;
    values.push(program[key]);
  }
  columnString = columnString.slice(0, -2);
  valueString = valueString.slice(0, -2);

  const result = await db.query(
    `INSERT INTO programs (${columnString}) 
    VALUES (${valueString})`,
    [
      ...values
    ]
  );

  let message = 'Error in creating program';

  if (result.affectedRows) {
    message = 'Program created successfully';
  }

  return { message };
}


async function editProgram(id, program) {

  let setString = '';
  let values = [];
  for (let key in program) {
    setString += `${key} = ?, `;
    values.push(program[key]);
  }
  setString = setString.slice(0, -2);

  const result = await db.query(
    `UPDATE programs 
    SET ${setString} 
    WHERE id=${id}`,
    [...values]
  );

  let message = 'Error in updating programs';

  if (result.affectedRows) {
    message = 'Programs updated successfully';
  }

  return { message };
}


async function deleteProgram(id) {

  const result = await db.query(
    `DELETE FROM programs WHERE id=${id}`
  );

  let message = 'Error in deleting program';

  if (result.affectedRows) {
    message = 'Programs deleted successfully';
  }

  return { message };
}



// getStudentsInProgram (not complet)
// async function getStudentsInProgram(id) {
//   const rows = await db.query(
//     `SELECT studentId
//     FROM programsStudents
//     WHERE programId = ${id}`
//   );

//   const studentsInProgram = helper.emptyOrRows(rows);

//   // const returnedStudents = [];

//   // students.forEach(
//   //   async (student) => {
//   //     const studentRows = await db.query(
//   //       `SELECT id, name, phone, age, nationality, gender, notes
//   //       FROM students
//   //       WHERE id = ${student.studentId}`
//   //     );
//   //     const studentRow = helper.emptyOrRows(studentRows);
//   //     returnedStudents.push(studentRow);
//   //   }
//   // )

//   return {
//     studentsInProgram
//   };
// }


module.exports = {
  getPrograms,
  getCurrentPrograms,
  getProgramById,
  createProgram,
  editProgram,
  deleteProgram
  // getStudentsInProgram,
}
