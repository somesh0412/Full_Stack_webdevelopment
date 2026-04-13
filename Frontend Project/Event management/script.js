const eventGrid = document.getElementById('event-grid');
const eventForm = document.getElementById('event-form');
const eventModal = document.getElementById('event-modal');
const openModalBtn = document.getElementById('open-modal');
const closeModalBtn = document.querySelector('.close-modal');
const filterBtns = document.querySelectorAll('.filter-btn');

let events = JSON.parse(localStorage.getItem('events-data')) || [];

// Open/Close Modal
openModalBtn.onclick = () => eventModal.style.display = 'block';
closeModalBtn.onclick = () => eventModal.style.display = 'none';

// Form Submission
eventForm.onsubmit = (e) => {
    e.preventDefault();
    const newEvent = {
        id: Date.now(),
        name: document.getElementById('event-name').value,
        date: document.getElementById('event-date').value,
        category: document.getElementById('event-category').value,
        desc: document.getElementById('event-desc').value
    };
    events.push(newEvent);
    localStorage.setItem('events-data', JSON.stringify(events));
    eventForm.reset();
    eventModal.style.display = 'none';
    renderEvents();
};

function renderEvents(filter = 'all') {
    eventGrid.innerHTML = '';
    const today = new Date().toISOString().split('T')[0];

    let filtered = events;
    if (filter === 'upcoming') filtered = events.filter(e => e.date >= today);
    if (filter === 'past') filtered = events.filter(e => e.date < today);

    // Sort by date
    filtered.sort((a, b) => new Date(a.date) - new Date(b.date));

    filtered.forEach(ev => {
        const card = document.createElement('div');
        card.className = 'event-card';
        card.innerHTML = `
            <p class="date">${new Date(ev.date).toDateString()}</p>
            <h3>${ev.name}</h3>
            <p>${ev.desc}</p>
            <span class="cat">${ev.category}</span>
            <button onclick="deleteEvent(${ev.id})" style="float:right; border:none; background:none; cursor:pointer; color:#ef4444">Delete</button>
        `;
        eventGrid.appendChild(card);
    });
}

window.deleteEvent = (id) => {
    events = events.filter(e => e.id !== id);
    localStorage.setItem('events-data', JSON.stringify(events));
    renderEvents();
};

// Filter logic
filterBtns.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderEvents(btn.dataset.filter);
    };
});

renderEvents();