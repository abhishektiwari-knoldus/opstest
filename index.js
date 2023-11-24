const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3000;

// MySQL database connection configuration
const dbConfig = {
  host: 'mysql_db',
  user: 'user', // Replace with your MySQL username
  password: 'akash', // Replace with your MySQL password
  database: 'form' // Replace with your database name
};

// Create a MySQL pool
const pool = mysql.createPool(dbConfig);

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the 'public' directory

// Serve the login.html file when accessing the root URL
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/landing.html');
});

app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/login.html');
  });

// Serve the signup.html file when accessing /signup route
app.get('/signup', (req, res) => {
  res.sendFile(__dirname + '/signup.html');
});

// Handle the POST request when the signup form is submitted
app.post('/signup', (req, res) => {
  const { username, password } = req.body;

  // Insert user data into the database
  pool.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, password], (err, results) => {
    if (err) {
      res.send('Error: Unable to register user');
    } else {
      res.send('Signup successful');
    }
  });
});

// Handle the POST request when the login form is submitted
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Check if the user exists in the database
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err || results.length === 0) {
      res.send('Invalid username or password');
    } else {
      res.send('Login successful');
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
