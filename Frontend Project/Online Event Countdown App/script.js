// Base Default Countdown State
let targetDateTime = new Date();
targetDateTime.setDate(targetDateTime.getDate() + 7); // Set to 7 days in the future by default
let eventTitle = "Product Launch Event";
let timerInterval = null;

const countdownForm = document.getElementById('countdownForm');
const activeTitle = document.getElementById('activeTitle');
const targetDisplay = document.getElementById('targetDisplay');
const countdownStatus = document.getElementById('countdownStatus');

const dEl = document.getElementById('days');
const hEl = document.getElementById('hours');
const mEl = document.getElementById('minutes');
const sEl = document.getElementById('seconds');

// Initialize the default date format string inside the Date Input
function setDefaultInputs() {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 7);
    
    const dateStr = defaultDate.toISOString().split('T')[0];
    document.getElementById('eventDate').value = dateStr;
}

// Calculate the remaining time down to the target moment
function updateTimer() {
    const now = new Date();
    const timeRemaining = targetDateTime - now;

    // Check if event has arrived
    if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        dEl.innerText = "00";
        hEl.innerText = "00";
        mEl.innerText = "00";
        sEl.innerText = "00";
        countdownStatus.innerText = "The event has started! 🎉";
        return;
    } else {
        countdownStatus.innerText = "";
    }

    // Convert time units using standard math
    const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

    // Render on screen with padded leading zeros
    dEl.innerText = String(days).padStart(2, '0');
    hEl.innerText = String(hours).padStart(2, '0');
    mEl.innerText = String(minutes).padStart(2, '0');
    sEl.innerText = String(seconds).padStart(2, '0');
}

// Initialize and start the interval loop
function startCountdown() {
    if (timerInterval) clearInterval(timerInterval);
    
    activeTitle.innerText = eventTitle;
    targetDisplay.innerText = targetDateTime.toLocaleString('en-US', {
        weekday: 'short', month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });

    updateTimer(); // Trigger first render immediately
    timerInterval = setInterval(updateTimer, 1000); // Trigger once per second
}

// Event submission listener
countdownForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const titleInput = document.getElementById('eventTitle').value.trim();
    const dateInput = document.getElementById('eventDate').value;
    const timeInput = document.getElementById('eventTime').value;

    eventTitle = titleInput;
    targetDateTime = new Date(`${dateInput}T${timeInput}`);

    // Validation: ensure target date isn't in the past
    if (isNaN(targetDateTime.getTime()) || targetDateTime < new Date()) {
        alert("Please choose a future date and time for the event.");
        return;
    }

    startCountdown();
});

// Primary initialization execution invocation
setDefaultInputs();
startCountdown();