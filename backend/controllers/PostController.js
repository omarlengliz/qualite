const Post = require('../models/Post');
const path = require('path');
const createPost = (req, res) => {
  const newPostData = {
    title: req.body.title,
    content: req.body.content,
    author: req.body.author,
    img: req.file ? req.file.path : null,
  };

  Post.create(newPostData, (err, result) => {
    
    res.status(201).json({ message: 'Post created!', postId: result.insertId });
  });
};

// Get all posts
const getAllPosts = (req, res) => {
  Post.getAll((err, results) => {
  
    res.json(results);
  });
};

module.exports = {
  createPost,
  getAllPosts,
};
