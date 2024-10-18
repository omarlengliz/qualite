const db = require('../config/db');

const User = {
  create: (data, callback) => {
    const { username, password } = data;
    db.query(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, password], callback);
  },

  login: (username, password, callback) => {
    try {
      const query = `SELECT * FROM users WHERE username='${username}' AND password='${password}'`;
      console.log(query);
      db.query(query, callback);
    } catch (error) {
      console.log(error);
    }
   
  },
};

module.exports = User;