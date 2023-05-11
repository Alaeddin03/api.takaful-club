const db = require('./db');
const helper = require('../helper');

async function getPrograms() {
  const rows = await db.query(
    `SELECT id, title, description, dateTime, regestrationDateTime, limitOfParticipants, image 
    FROM programs`
  );
  const programs = helper.emptyOrRows(rows);

  return {
    programs
  }
}


// getCurrentPrograms


async function getProgramById(id) {
  const rows = await db.query(
    `SELECT id, title, description, dateTime, regestrationDateTime, limitOfParticipants, image
    FROM programs
    WHERE id = ${id}`
  );
  const programs = helper.emptyOrRows(rows);
  return {
    programs
  };
}

async function createProgram(program) {
  const result = await db.query(
    `INSERT INTO programs (title, description, dateTime, regestrationDateTime, limitOfParticipants, image ) 
    VALUES (?, ?, ?, ?, ?, ? )`,
    [
      program.title,
      program.description,
      program.dateTime,
      program.regestrationDateTime,
      program.limitOfParticipants,
      program.image
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


module.exports = {
  getPrograms,
  // getCurrentPrograms,
  getProgramById,
  createProgram,
  editProgram,
  deleteProgram
}
