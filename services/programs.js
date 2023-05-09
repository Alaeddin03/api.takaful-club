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

module.exports = {
    getPrograms
}
