const helper = require('./helper');


const dbConfig = {
  db: {
    host: "localhost",
    user: "root",
    password: "Alaad003",
    database: "takaful",
  }
};

const admin = {
  username: "admin",
  password: helper.hashPassword("password"),
}

module.exports = {
  dbConfig,
  admin
}