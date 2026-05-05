// Local In-Memory Data Store
const activeClubs = [
    { id: 1, title: "Google Developer Student Club", category: "Technology", desc: "Collaborate on software projects and learn emerging technologies." },
    { id: 2, title: "Literary & Debate Society", category: "Arts & Culture", desc: "Hone your public speaking, creative writing, and debating skills." },
    { id: 3, title: "Robotics & Automation Club", category: "Engineering", desc: "Design, build, and test mechanical and autonomous robot systems." },
    { id: 4, title: "Eco Warriors Environment Club", category: "Social Welfare", desc: "Drive sustainability campaigns and green campus activities." },
    { id: 5, title: "Music & Performing Arts", category: "Arts & Culture", desc: "Showcase your vocal, instrumental, and stage performance talents." }
];

const applications = [
    { id: 101, name: "Suresh Patil", studentId: "S2026012", club: "Google Developer Student Club", statement: "I'm interested in working on open-source web development projects.", date: "2026-05-01" },
    { id: 102, name: "Anjali Gupta", studentId: "S2026045", club: "Literary & Debate Society", statement: "I'd love to organize debate competitions for the freshmen.", date: "2026-05-02" }
];

// Document Object Model References
const clubsContainer = document.getElementById('clubsContainer');
const clubSelectInput = document.getElementById('clubSelect');
const membershipForm = document.getElementById('membershipForm');
const applicationTableBody = document.getElementById('applicationTableBody');

// Render the club cards
function renderClubs(clubsToDisplay = activeClubs) {
    clubsContainer.innerHTML = clubsToDisplay.map(c => `
        <div class="club-card">
            <div>
                <span class="club-category">${c.category}</span>
                <h3 class="club-title">${c.title}</h3>
                <p class="club-desc">${c.desc}</p>
            </div>
        </div>
    `).join('');
}

// Dynamically populate the form dropdown selection
function populateClubDropdown() {
    clubSelectInput.innerHTML = `<option value="">Select a club</option>` + activeClubs.map(c => `
        <option value="${c.title}">${c.title}</option>
    `).join('');
}

// Render student application table log
function renderApplicationTable() {
    applicationTableBody.innerHTML = applications.map(app => `
        <tr>
            <td><strong>${app.name}</strong></td>
            <td>${app.studentId}</td>
            <td>${app.club}</td>
            <td>${app.statement}</td>
            <td>${app.date}</td>
            <td><button class="btn-delete" onclick="deleteApplication(${app.id})">Remove</button></td>
        </tr>
    `).join('');
}

// Client-side instant filter function
function filterClubs() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filtered = activeClubs.filter(c => 
        c.title.toLowerCase().includes(searchTerm) || 
        c.category.toLowerCase().includes(searchTerm)
    );
    renderClubs(filtered);
}

// Handle Form Submission
membershipForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('studentName').value.trim();
    const studentId = document.getElementById('studentId').value.trim();
    const club = document.getElementById('clubSelect').value;
    const statement = document.getElementById('statement').value.trim();
    const date = new Date().toISOString().split('T')[0];

    // Push into data array
    applications.unshift({
        id: Date.now(),
        name,
        studentId,
        club,
        statement,
        date
    });

    // Refresh display
    renderApplicationTable();
    membershipForm.reset();
});

// Remove an application row
function deleteApplication(id) {
    const index = applications.findIndex(a => a.id === id);
    if (index !== -1) {
        applications.splice(index, 1);
        renderApplicationTable();
    }
}

// Primary execution initialization
renderClubs();
populateClubDropdown();
renderApplicationTable();