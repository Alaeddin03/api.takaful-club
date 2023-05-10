const db = require('./db');
const helper = require('../helper');

async function getPrograms(){
  const rows = await db.query(
    `SELECT id, title, description, dateTime, regestrationDateTime, limitOfParticipants, image 
    FROM programs`
  );
  const programs = helper.emptyOrRows(rows);

  return {
    programs
  }
}

async function createProgram(program) {
  const result  = await db.query(
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

async function editPrograms(id, programs){
  const result = await db.query(
    `UPDATE programs 
    SET id="${programs.id}", title=${programs.title}, description=${programs.description}, 
    dateTime=${programs.dateTime}, regestrationDateTime=${programs.regestrationDateTime}, limitOfParticipants=${programs.limitOfParticipants}, image=${programs.image} 
    WHERE id=${id}` 
  );

  let message = 'Error in updating programs';

  if (result.affectedRows) {
    message = 'Programs updated successfully';
  }

  return {message};
}


module.exports = {
    getPrograms,
    createProgram,
    getPrograms,editPrograms

}
