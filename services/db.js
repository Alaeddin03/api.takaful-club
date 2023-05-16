const mysql = require('mysql2/promise');
const config = require('../config');
require('dotenv').config()

async function query(sql, params) {
  // const connection = await mysql.createConnection(config.dbConfig.db);
  const connection = await mysql.createConnection(process.env.DATABASE_URL)
  console.log('Connected to PlanetScale!')
  const [results, ] = await connection.execute(sql, params);

  connection.end();
  return results;
}

module.exports = {
  query
}