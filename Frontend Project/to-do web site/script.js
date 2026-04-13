const todoForm = document.getElementById('todo-form');
const todoInput = document.getElementById('todo-input');
const todoList = document.getElementById('todo-list');
const itemsLeft = document.getElementById('items-left');
const clearBtn = document.getElementById('clear-completed');
const dateDisplay = document.getElementById('date-display');

// Set Date
const options = { weekday: 'long', month: 'long', day: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

// Load tasks from LocalStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    todoList.innerHTML = '';
    
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.className = `todo-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            <span>${task.text}</span>
            <button class="delete-task" onclick="deleteTask(${index})">&times;</button>
        `;
        todoList.appendChild(li);
    });

    const activeTasks = tasks.filter(t => !t.completed).length;
    itemsLeft.innerText = `${activeTasks} items left`;
}

// Add Task
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        todoInput.value = '';
        saveTasks();
    }
});

// Toggle Task Status
window.toggleTask = (index) => {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
};

// Delete Task
window.deleteTask = (index) => {
    tasks.splice(index, 1);
    saveTasks();
};

// Clear All Completed
clearBtn.onclick = () => {
    tasks = tasks.filter(t => !t.completed);
    saveTasks();
};

// Initial Render
renderTasks();