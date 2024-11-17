const Post = require('../models/Post');
const path = require('path');
const createPost = (req, res) => {
  const newPostData = {
    title: req.body.title || null,
    content: req.body.content || null ,
    author: req.body.author ,
    img: req.file ? req.file.path : null,
  };
  console.log(newPostData);
  Post.create(newPostData, (err, result) => {
    
    res.status(201).json({ message: 'Post created!', postId: result.insertId });
  });
};

const getAllPosts = (req, res) => {
  Post.getAll((err, results) => {
  
    res.json(results);
  });
};

module.exports = {
  createPost,
  getAllPosts,
};
