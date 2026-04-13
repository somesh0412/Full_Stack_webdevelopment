const apptForm = document.getElementById('appointment-form');
const apptList = document.getElementById('appointment-list');
const dateInput = document.getElementById('book-date');

// Set minimum date to today
const today = new Date().toISOString().split('T')[0];
dateInput.setAttribute('min', today);

let appointments = JSON.parse(localStorage.getItem('booked_appts')) || [];

apptForm.onsubmit = (e) => {
    e.preventDefault();

    const newAppt = {
        id: Date.now(),
        service: document.getElementById('service-type').value,
        date: document.getElementById('book-date').value,
        time: document.getElementById('book-time').value,
        name: document.getElementById('user-name').value
    };

    appointments.unshift(newAppt);
    localStorage.setItem('booked_appts', JSON.stringify(appointments));
    
    apptForm.reset();
    renderAppointments();
    alert("Appointment successfully booked!");
};

function renderAppointments() {
    apptList.innerHTML = '';

    if (appointments.length === 0) {
        apptList.innerHTML = '<p style="text-align:center; color:#94a3b8; font-size:0.9rem;">No upcoming appointments.</p>';
        return;
    }

    appointments.forEach(appt => {
        const div = document.createElement('div');
        div.className = 'appointment-item';
        div.innerHTML = `
            <div class="appt-info">
                <h4>${appt.service}</h4>
                <p>📅 ${appt.date} at ${appt.time} | For: ${appt.name}</p>
            </div>
            <span class="status-badge">Confirmed</span>
        `;
        apptList.appendChild(div);
    });
}

// Initial Render
renderAppointments();