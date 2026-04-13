const notesGrid = document.getElementById('notes-grid');
const noteModal = document.getElementById('note-modal');
const addNoteBtn = document.getElementById('add-note-btn');
const closeBtn = document.querySelector('.close-btn');
const noteForm = document.getElementById('note-form');

let notes = JSON.parse(localStorage.getItem('my-notes')) || [];

// Initialize
displayNotes();

// Event Listeners
addNoteBtn.onclick = () => noteModal.style.display = 'block';
closeBtn.onclick = () => noteModal.style.display = 'none';
window.onclick = (e) => { if(e.target == noteModal) noteModal.style.display = 'none'; }

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title-input').value;
    const content = document.getElementById('content-input').value;
    
    const newNote = {
        id: Date.now(),
        title,
        content,
        date: new Date().toLocaleDateString()
    };

    notes.push(newNote);
    saveAndRender();
    noteForm.reset();
    noteModal.style.display = 'none';
});

function deleteNote(id) {
    notes = notes.filter(note => note.id !== id);
    saveAndRender();
}

function saveAndRender() {
    localStorage.setItem('my-notes', JSON.stringify(notes));
    displayNotes();
}

function displayNotes() {
    notesGrid.innerHTML = '';
    
    if (notes.length === 0) {
        notesGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #94a3b8;">No notes yet. Click "New Note" to start.</p>`;
        return;
    }

    notes.forEach(note => {
        const noteEl = document.createElement('div');
        noteEl.classList.add('note-card');
        noteEl.innerHTML = `
            <button class="delete-btn" onclick="deleteNote(${note.id})">
                <span class="material-symbols-outlined">delete</span>
            </button>
            <h3>${note.title}</h3>
            <p>${note.content}</p>
            <span class="note-date">${note.date}</span>
        `;
        notesGrid.appendChild(noteEl);
    });
}