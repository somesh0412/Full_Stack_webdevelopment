const complaintForm = document.getElementById('complaint-form');
const complaintList = document.getElementById('complaint-list');

let complaints = JSON.parse(localStorage.getItem('complaints_db')) || [];

// View Toggler
function toggleView(view) {
    document.getElementById('form-view').classList.toggle('hidden', view !== 'form');
    document.getElementById('status-view').classList.toggle('hidden', view !== 'status');
    if(view === 'status') renderComplaints();
}

// Form Submission
complaintForm.onsubmit = (e) => {
    e.preventDefault();

    const newComplaint = {
        id: 'TKT-' + Math.floor(1000 + Math.random() * 9000), // Unique Ticket ID
        name: document.getElementById('name').value,
        category: document.getElementById('category').value,
        subject: document.getElementById('subject').value,
        description: document.getElementById('description').value,
        status: 'Pending Review',
        date: new Date().toLocaleDateString()
    };

    complaints.unshift(newEvent); // Add to start of array
    localStorage.setItem('complaints_db', JSON.stringify(complaints));
    
    alert(`Complaint Registered! Your Tracking ID is: ${newComplaint.id}`);
    complaintForm.reset();
    toggleView('status');
};

function renderComplaints() {
    complaintList.innerHTML = '';

    if (complaints.length === 0) {
        complaintList.innerHTML = '<p style="text-align:center; padding: 2rem;">No complaints registered yet.</p>';
        return;
    }

    complaints.forEach(item => {
        const card = document.createElement('div');
        card.className = 'complaint-card';
        card.innerHTML = `
            <span class="status-badge">${item.status}</span>
            <span class="ticket-id">#${item.id}</span>
            <h3 style="margin: 10px 0 5px;">${item.subject}</h3>
            <p style="font-size: 0.9rem; color: #64748b;">Category: <strong>${item.category}</strong></p>
            <p style="margin: 10px 0; color: #334155;">${item.description}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin-bottom: 10px;">
            <small>Submitted on ${item.date} by ${item.name}</small>
        `;
        complaintList.appendChild(card);
    });
}

// Initial Call
renderComplaints();