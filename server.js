// server.js

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'swathi',
  password: 'swathi',
  database: 'gaming'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + db.threadId);
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.get('/leaderboard', (req, res) => {
  db.query('SELECT * FROM leaderboard ORDER BY score DESC LIMIT 10', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.post('/submit-score', (req, res) => {
  const { username, score } = req.body;
  const insertQuery = 'INSERT INTO leaderboard (username, score) VALUES (?, ?)';
  db.query(insertQuery, [username, score], (err, results) => {
    if (err) throw err;
    res.send('Score added to leaderboard.');
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
