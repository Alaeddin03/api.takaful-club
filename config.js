const helper = require('./helper');


const dbConfig = {
  db: {
    host: "localhost",
    user: "root",
    password: "",
    database: "takaful",
  }
};


const admin = {
  username: "admin",
  password: '$2a$12$vqnbr01VZbj.NqjlUYCihukN9XJPv512WrIqm0DqKJCiL7zpjVMBO',
}

module.exports = {
  dbConfig,
  admin
}