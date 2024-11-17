const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const postRoutes = require('./routes/PostRoutes');
const userRoutes = require('./routes/UserRoutes');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', ''); 
  next();
});
app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);



app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
