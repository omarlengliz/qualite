const db = require('../config/db');

const Post = {
  getAll: (callback) => {
    db.query('SELECT * FROM posts', callback);
  },

  create: (data, callback) => {
    const { title, content, author ,img } = data;
    db.query(`INSERT INTO posts (title, content, author , img) VALUES (?, ?, ? , ?)`, [title, content, author ,img], callback);
  },
};

module.exports = Post;