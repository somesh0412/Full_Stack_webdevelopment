const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({ host: 'localhost', user: 'root', password: '8275', database: 'auth_db' });

// Register Route
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashedPassword], (err) => {
        if (err) return res.status(400).json({ message: "User exists" });
        res.json({ message: "Registered!" });
    });
});

// Login Route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.query('SELECT * FROM users WHERE username = ?', [username], async (err, results) => {
        if (results.length > 0 && await bcrypt.compare(password, results[0].password)) {
            const token = jwt.sign({ id: results[0].id }, 'supersecret', { expiresIn: '1h' });
            res.json({ token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
});

app.listen(3000, () => console.log('Server running on port 3000'));