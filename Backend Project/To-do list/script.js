async function fetchTasks() {
    const res = await fetch('http://localhost:3000/tasks');
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    list.innerHTML = tasks.map(t => `<li>${t.task_text}</li>`).join('');
}

async function addTask() {
    const text = document.getElementById('taskInput').value;
    await fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
    });
    document.getElementById('taskInput').value = '';
    fetchTasks();
}
// Add this new function to your existing script.js
async function deleteTask(taskId) {
    await fetch(`http://localhost:3000/tasks/${taskId}`, { method: 'DELETE' });
    fetchTasks(); // Refresh list
}

// Update your render function to include the button
async function fetchTasks() {
    const res = await fetch('http://localhost:3000/tasks');
    const tasks = await res.json();
    const list = document.getElementById('taskList');
    
    list.innerHTML = tasks.map(t => `
        <li>
            ${t.task_text}
            <button class="delete-btn" onclick="deleteTask(${t.id})">Delete</button>
        </li>
    `).join('');
}
fetchTasks();