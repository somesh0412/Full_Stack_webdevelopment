const entryTitle = document.getElementById('entry-title');
const entryBody = document.getElementById('entry-body');
const saveBtn = document.getElementById('save-btn');
const entryList = document.getElementById('entry-list');
const newBtn = document.getElementById('new-entry-btn');
const dateDisplay = document.getElementById('current-date');

let diaryEntries = JSON.parse(localStorage.getItem('zen_diary_entries')) || [];
let currentEditingId = null;

// Set Date
const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

// Initialize
renderSidebar();

// New Entry
newBtn.onclick = () => {
    currentEditingId = null;
    entryTitle.value = '';
    entryBody.value = '';
    entryTitle.focus();
};

// Save Logic
saveBtn.onclick = () => {
    const title = entryTitle.value.trim() || "Untitled Entry";
    const body = entryBody.value.trim();

    if (!body) return alert("You can't save an empty thought!");

    if (currentEditingId) {
        // Update existing
        const index = diaryEntries.findIndex(e => e.id === currentEditingId);
        diaryEntries[index] = { ...diaryEntries[index], title, body };
    } else {
        // Create new
        const newEntry = {
            id: Date.now(),
            title,
            body,
            date: new Date().toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
            fullDate: new Date().toLocaleDateString(undefined, options)
        };
        diaryEntries.unshift(newEntry);
        currentEditingId = newEntry.id;
    }

    localStorage.setItem('zen_diary_entries', JSON.stringify(diaryEntries));
    renderSidebar();
    alert("Thought preserved.");
};

function renderSidebar() {
    entryList.innerHTML = '';
    diaryEntries.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'entry-item';
        div.innerHTML = `
            <h4>${entry.title}</h4>
            <small>${entry.date}</small>
        `;
        div.onclick = () => loadEntry(entry.id);
        entryList.appendChild(div);
    });
}

function loadEntry(id) {
    const entry = diaryEntries.find(e => e.id === id);
    if (entry) {
        currentEditingId = entry.id;
        entryTitle.value = entry.title;
        entryBody.value = entry.body;
        dateDisplay.innerText = entry.fullDate;
    }
}