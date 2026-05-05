// Local memory state for planner
const tasks = [
    { id: 1, text: "Conduct weekly team sync", completed: false },
    { id: 2, text: "Read 20 pages of book", completed: true },
    { id: 3, text: "Clean office desk setup", completed: false }
];

// Schedule time definitions
const timeBlocks = [
    "08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM", 
    "06:00 PM", "07:00 PM", "08:00 PM"
];

const todoForm = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const todoList = document.getElementById('todoList');
const taskCounter = document.getElementById('taskCounter');
const scheduleGrid = document.getElementById('scheduleGrid');
const currentDateEl = document.getElementById('currentDate');

// Sets local localized date string
function setDate() {
    const today = new Date();
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    currentDateEl.innerText = today.toLocaleDateString('en-US', options);
}

// Build hour rows in the schedule panel
function renderSchedule() {
    scheduleGrid.innerHTML = timeBlocks.map(time => `
        <div class="schedule-row">
            <div class="schedule-time">${time}</div>
            <input type="text" class="schedule-input" placeholder="Plan your focus...">
        </div>
    `).join('');
}

// Build checklist tasks 
function renderTasks() {
    todoList.innerHTML = tasks.map(t => `
        <li class="todo-item ${t.completed ? 'completed' : ''}">
            <div class="todo-left">
                <input type="checkbox" ${t.completed ? 'checked' : ''} onclick="toggleComplete(${t.id})">
                <span>${t.text}</span>
            </div>
            <button class="btn-delete" onclick="deleteTask(${t.id})">Delete</button>
        </li>
    `).join('');

    updateProgress();
}

// Calculates percentage completed
function updateProgress() {
    if (tasks.length === 0) {
        taskCounter.innerText = "0% completed";
        return;
    }
    const completedCount = tasks.filter(t => t.completed).length;
    const percentage = Math.round((completedCount / tasks.length) * 100);
    taskCounter.innerText = `${percentage}% completed`;
}

// Toggle task checkbox
function toggleComplete(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = !task.completed;
        renderTasks();
    }
}

// Intercept add form submission
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = taskInput.value.trim();
    if (!text) return;

    tasks.unshift({
        id: Date.now(),
        text: text,
        completed: false
    });

    taskInput.value = '';
    renderTasks();
});

// Delete individual tasks
function deleteTask(id) {
    const index = tasks.findIndex(t => t.id === id);
    if (index !== -1) {
        tasks.splice(index, 1);
        renderTasks();
    }
}

// Initialization calls
setDate();
renderSchedule();
renderTasks();