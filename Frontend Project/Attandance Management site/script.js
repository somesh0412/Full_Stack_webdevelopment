const attendanceForm = document.getElementById('attendance-form');
const attendanceLog = document.getElementById('attendance-log');
const clockDisplay = document.getElementById('live-clock');
const todayDateDisplay = document.getElementById('today-date');
const totalCountEl = document.getElementById('total-count');

let log = JSON.parse(localStorage.getItem('attendance_db')) || [];

// 1. Live Clock Logic
setInterval(() => {
    const now = new Date();
    clockDisplay.innerText = now.toLocaleTimeString();
}, 1000);

// 2. Set Current Date Display
const today = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
todayDateDisplay.innerText = today;

// 3. Form Submission
attendanceForm.onsubmit = (e) => {
    e.preventDefault();

    const now = new Date();
    const entry = {
        name: document.getElementById('user-name').value,
        dept: document.getElementById('department').value,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        id: Date.now()
    };

    log.unshift(entry);
    localStorage.setItem('attendance_db', JSON.stringify(log));
    
    attendanceForm.reset();
    renderLog();
};

function renderLog() {
    attendanceLog.innerHTML = '';
    
    // Filter to only show today's attendance in the summary count
    const todayStr = new Date().toLocaleDateString();
    const todayEntries = log.filter(item => item.date === todayStr);
    totalCountEl.innerText = todayEntries.length;

    log.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td style="font-weight:600">${item.name}</td>
            <td>${item.dept}</td>
            <td>${item.date}</td>
            <td>${item.time}</td>
            <td><span class="status-tag">Present</span></td>
        `;
        attendanceLog.appendChild(row);
    });
}

// Initial Render
renderLog();