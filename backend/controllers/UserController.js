const User = require('../models/User');

exports.register = (req, res) => {
  const { username, password } = req.body;
  User.create({ username, password }, (err) => {
    if (err) throw err;
    res.json({ message: 'User registered!' });
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  try {
    User.login(username, password, (err, results) => {
      if (err) {
        // Handle database error and prevent server crash
        console.error('Database error:', err); // Log the error for debugging
        return res.status(500).json({ message: 'Internal server error' });
      }
  
      if (results.length > 0) {
        const user = {
          id: results[0].id,
          username: results[0].username,
          password: results[0].password,
        };
        console.log('User found:', user);
        return res.status(200).json({ message: 'Login successful!', user });
      } else {
        // No user found with the provided credentials
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } catch (error) {
    // Catch any unexpected errors and prevent the server from crashing
    console.error('Unexpected error:', error); // Log the error
    res.status(500).json({ message: 'Something went wrong. Please try again later.' });
  }
  
  
};