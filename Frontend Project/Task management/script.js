let tasks = JSON.parse(localStorage.getItem('tasks_db')) || [];
let currentFilter = 'all';

const taskForm = document.getElementById('task-form');
const taskList = document.getElementById('task-list');
const dateDisplay = document.getElementById('current-date');

// Set Date
dateDisplay.innerText = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' });

taskForm.onsubmit = (e) => {
    e.preventDefault();
    const newTask = {
        id: Date.now(),
        text: document.getElementById('task-title').value,
        priority: document.getElementById('task-priority').value,
        completed: false
    };
    tasks.unshift(newTask);
    saveAndRender();
    taskForm.reset();
};

function saveAndRender() {
    localStorage.setItem('tasks_db', JSON.stringify(tasks));
    renderTasks();
    updateStats();
}

function renderTasks() {
    taskList.innerHTML = '';
    
    const filteredTasks = tasks.filter(t => {
        if (currentFilter === 'pending') return !t.completed;
        if (currentFilter === 'completed') return t.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const div = document.createElement('div');
        div.className = `task-item ${task.priority} ${task.completed ? 'done' : ''}`;
        div.innerHTML = `
            <div class="task-content">
                <input type="checkbox" ${task.completed ? 'checked' : ''} onclick="toggleTask(${task.id})">
                <span>${task.text}</span>
            </div>
            <button class="btn-delete" onclick="deleteTask(${task.id})">✕</button>
        `;
        taskList.appendChild(div);
    });
}

window.toggleTask = (id) => {
    const task = tasks.find(t => t.id === id);
    task.completed = !task.completed;
    saveAndRender();
};

window.deleteTask = (id) => {
    tasks = tasks.filter(t => t.id !== id);
    saveAndRender();
};

window.filterTasks = (type) => {
    currentFilter = type;
    document.querySelectorAll('.filter-bar button').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.toLowerCase() === type);
    });
    renderTasks();
};

function updateStats() {
    document.getElementById('pending-count').innerText = tasks.filter(t => !t.completed).length;
    document.getElementById('completed-count').innerText = tasks.filter(t => t.completed).length;
}

// Initial Call
saveAndRender();