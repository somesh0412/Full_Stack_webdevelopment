const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    host: 'localhost', user: 'root', password: '8275', database: 'todo_db'
});

// Get all tasks
app.get('/tasks', (req, res) => {
    db.query('SELECT * FROM todos', (err, results) => res.json(results));
});

// Add a task
app.post('/tasks', (req, res) => {
    const { text } = req.body;
    db.query('INSERT INTO todos (task_text) VALUES (?)', [text], (err, result) => {
        res.json({ id: result.insertId, task_text: text, is_completed: false });
    });
});

// Add this to your server.js
app.delete('/tasks/:id', (req, res) => {
    const taskId = req.params.id;
    db.query('DELETE FROM todos WHERE id = ?', [taskId], (err, result) => {
        if (err) return res.status(500).send(err);
        res.json({ message: 'Task deleted successfully' });
    });
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));