const express = require('express');
const multer = require('multer');
const { createPost, getAllPosts } = require('../controllers/PostController');
const path = require('path');

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); 
  },
});

const upload = multer({ storage });

router.post('/', upload.single('image'), createPost);

router.get('/', getAllPosts);

module.exports = router;
