// DOM Elements
let hoursElem, minutesElem, secondsElem, ampmElem, dateDisplay;
let alarmsListContainer;
let alarmModal, ringingLabelSpan, ringingTimeSpan;
let currentAudio = null;
let alarmIntervalChecker = null;
let alarms = [];

// Load alarms from localStorage
function loadAlarms() {
    const stored = localStorage.getItem('alarm_system');
    if (stored) {
        alarms = JSON.parse(stored);
        // Convert ISO string dates back to Date objects? No need, just store raw
    } else {
        alarms = [];
    }
    renderAlarms();
}

function saveAlarms() {
    localStorage.setItem('alarm_system', JSON.stringify(alarms));
}

// Update real-time clock
function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    let displayHours = hours % 12;
    displayHours = displayHours === 0 ? 12 : displayHours;
    const hoursStr = displayHours.toString().padStart(2, '0');
    
    hoursElem.textContent = hoursStr;
    minutesElem.textContent = minutes;
    secondsElem.textContent = seconds;
    ampmElem.textContent = ampm;
    
    // Update date
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateDisplay.textContent = now.toLocaleDateString(undefined, options);
    
    // Check alarms every second (real-time)
    checkAlarms(now);
}

// Check if any alarm should ring
function checkAlarms(currentTime) {
    const currentHour24 = currentTime.getHours();
    const currentMinute = currentTime.getMinutes();
    const currentSecond = currentTime.getSeconds();
    
    for (let i = 0; i < alarms.length; i++) {
        const alarm = alarms[i];
        if (alarm.isRinging) continue; // already ringing
        
        // Convert alarm time to 24-hour format
        let alarmHour24 = alarm.hour;
        if (alarm.period === 'PM' && alarm.hour !== 12) alarmHour24 = alarm.hour + 12;
        if (alarm.period === 'AM' && alarm.hour === 12) alarmHour24 = 0;
        
        // Check if time matches (ignore seconds, trigger at minute start)
        if (alarmHour24 === currentHour24 && alarm.minute === currentMinute && currentSecond === 0) {
            // Check repeat / expiry logic (no expiry except normal)
            // Also check if snoozed? we handle snooze by setting snoozeUntil
            if (alarm.snoozeUntil && new Date() < new Date(alarm.snoozeUntil)) {
                continue; // snoozed, skip
            }
            // Ring the alarm!
            triggerAlarm(alarm.id);
        }
    }
}

// Play ringtone based on selection
let audioContextInitialized = false;
function playRingtone(ringtoneType) {
    stopCurrentRingtone();
    let audioElem = null;
    switch(ringtoneType) {
        case 'beep':
            audioElem = document.getElementById('beepSound');
            break;
        case 'digital':
            audioElem = document.getElementById('digitalSound');
            break;
        case 'chime':
            audioElem = document.getElementById('chimeSound');
            break;
        case 'urgent':
            audioElem = document.getElementById('urgentSound');
            break;
        default:
            audioElem = document.getElementById('beepSound');
    }
    
    if (audioElem) {
        audioElem.loop = true;
        audioElem.volume = 0.7;
        audioElem.play().catch(e => {
            console.log("Audio autoplay blocked. Showing enable button.");
            document.getElementById('enableAudioBtn').style.display = 'block';
        });
        currentAudio = audioElem;
    }
}

function stopCurrentRingtone() {
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
    }
}

function triggerAlarm(alarmId) {
    const alarm = alarms.find(a => a.id === alarmId);
    if (!alarm || alarm.isRinging) return;
    
    alarm.isRinging = true;
    saveAlarms();
    
    // Show modal
    const labelText = alarm.label ? alarm.label : "Alarm";
    ringingLabelSpan.textContent = `⏰ ${labelText}`;
    ringingTimeSpan.textContent = `${formatAlarmTime(alarm.hour, alarm.minute, alarm.period)}`;
    alarmModal.style.display = 'flex';
    
    playRingtone(alarm.ringtone);
    
    // Store currently ringing alarm id for stop/snooze actions
    window.currentRingingAlarmId = alarmId;
}

// Format alarm display time
function formatAlarmTime(hour, minute, period) {
    const hourStr = hour.toString().padStart(2, '0');
    const minuteStr = minute.toString().padStart(2, '0');
    return `${hourStr}:${minuteStr} ${period}`;
}

// Stop alarm (dismiss)
function stopAlarm() {
    if (window.currentRingingAlarmId) {
        const alarm = alarms.find(a => a.id === window.currentRingingAlarmId);
        if (alarm) {
            alarm.isRinging = false;
            // Remove snooze flag if any
            delete alarm.snoozeUntil;
            // If not repeat daily, we could delete after stop? Better to keep but mark as not ringing
            saveAlarms();
            renderAlarms();
        }
        alarmModal.style.display = 'none';
        stopCurrentRingtone();
        window.currentRingingAlarmId = null;
    } else {
        alarmModal.style.display = 'none';
        stopCurrentRingtone();
    }
}

// Snooze alarm: add 5 minutes to snoozeUntil
function snoozeAlarm() {
    if (window.currentRingingAlarmId) {
        const alarm = alarms.find(a => a.id === window.currentRingingAlarmId);
        if (alarm) {
            const snoozeTime = new Date();
            snoozeTime.setMinutes(snoozeTime.getMinutes() + 5);
            alarm.snoozeUntil = snoozeTime.toISOString();
            alarm.isRinging = false;
            saveAlarms();
            renderAlarms();
        }
        alarmModal.style.display = 'none';
        stopCurrentRingtone();
        window.currentRingingAlarmId = null;
    }
}

// Set new alarm
function setAlarm() {
    const hour = parseInt(document.getElementById('alarmHour').value);
    const minute = parseInt(document.getElementById('alarmMinute').value);
    const period = document.getElementById('alarmPeriod').value;
    const ringtone = document.getElementById('ringtoneSelect').value;
    const label = document.getElementById('alarmLabel').value.trim();
    const repeatDaily = document.getElementById('repeatDaily').checked;
    
    if (alarms.length >= 12) {
        alert("Maximum 12 alarms allowed. Please delete some.");
        return;
    }
    
    const newAlarm = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 4),
        hour: hour,
        minute: minute,
        period: period,
        ringtone: ringtone,
        label: label || "Alarm",
        repeatDaily: repeatDaily,
        isRinging: false,
        snoozeUntil: null,
        createdAt: new Date().toISOString()
    };
    alarms.push(newAlarm);
    saveAlarms();
    renderAlarms();
    clearAlarmForm();
}

function clearAlarmForm() {
    document.getElementById('alarmLabel').value = '';
    document.getElementById('repeatDaily').checked = false;
    document.getElementById('alarmHour').value = "7";
    document.getElementById('alarmMinute').value = "0";
    document.getElementById('alarmPeriod').value = "AM";
}

function deleteAlarm(alarmId) {
    if (confirm("Delete this alarm?")) {
        alarms = alarms.filter(a => a.id !== alarmId);
        saveAlarms();
        renderAlarms();
        if (window.currentRingingAlarmId === alarmId) {
            stopAlarm();
        }
    }
}

function snoozeSingleAlarm(alarmId) {
    const alarm = alarms.find(a => a.id === alarmId);
    if (alarm && !alarm.isRinging) {
        const snoozeUntil = new Date();
        snoozeUntil.setMinutes(snoozeUntil.getMinutes() + 5);
        alarm.snoozeUntil = snoozeUntil.toISOString();
        saveAlarms();
        renderAlarms();
        alert(`Alarm snoozed for 5 minutes.`);
    } else if (alarm && alarm.isRinging) {
        alert("Alarm is currently ringing! Use the modal snooze.");
    } else {
        alert("Alarm not found.");
    }
}

function snoozeAllAlarms() {
    const now = new Date();
    let snoozedCount = 0;
    alarms.forEach(alarm => {
        if (!alarm.isRinging) {
            const snoozeUntil = new Date();
            snoozeUntil.setMinutes(now.getMinutes() + 5);
            alarm.snoozeUntil = snoozeUntil.toISOString();
            snoozedCount++;
        }
    });
    saveAlarms();
    renderAlarms();
    alert(`Snoozed ${snoozedCount} active alarm(s) for 5 minutes.`);
}

function renderAlarms() {
    if (!alarmsListContainer) return;
    if (alarms.length === 0) {
        alarmsListContainer.innerHTML = `<div class="empty-state">✨ No alarms set. Create your first alarm!</div>`;
        return;
    }
    let html = '';
    alarms.forEach(alarm => {
        const isSnoozed = alarm.snoozeUntil && new Date() < new Date(alarm.snoozeUntil);
        const snoozeInfo = isSnoozed ? ` (Snoozed until ${new Date(alarm.snoozeUntil).toLocaleTimeString()})` : '';
        html += `
            <div class="alarm-item">
                <div class="alarm-info">
                    <div class="alarm-time">⏰ ${formatAlarmTime(alarm.hour, alarm.minute, alarm.period)} ${alarm.repeatDaily ? '🔄 Daily' : '🔔 One-time'}</div>
                    <div class="alarm-label">${escapeHtml(alarm.label)}${snoozeInfo}</div>
                </div>
                <div class="alarm-actions">
                    <button class="snooze-item-btn" onclick="snoozeSingleAlarm('${alarm.id}')">😴 Snooze</button>
                    <button class="delete-alarm-btn" onclick="deleteAlarm('${alarm.id}')">🗑️ Del</button>
                </div>
            </div>
        `;
    });
    alarmsListContainer.innerHTML = html;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Audio user interaction fix
function enableAudio() {
    // Create silent audio context to unlock audio
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
        const ctx = new AudioContext();
        ctx.resume().then(() => {
            console.log("Audio context resumed");
            document.getElementById('enableAudioBtn').style.display = 'none';
        });
    }
    // preload all sounds silently
    const sounds = ['beepSound', 'digitalSound', 'chimeSound', 'urgentSound'];
    sounds.forEach(id => {
        const audio = document.getElementById(id);
        if (audio) audio.load();
    });
}

// Initialize DOM and start clock
document.addEventListener('DOMContentLoaded', () => {
    hoursElem = document.getElementById('hours');
    minutesElem = document.getElementById('minutes');
    secondsElem = document.getElementById('seconds');
    ampmElem = document.getElementById('ampm');
    dateDisplay = document.getElementById('dateDisplay');
    alarmsListContainer = document.getElementById('alarmsList');
    alarmModal = document.getElementById('alarmModal');
    ringingLabelSpan = document.getElementById('ringingLabel');
    ringingTimeSpan = document.getElementById('ringingTime');
    
    loadAlarms();
    updateClock();
    setInterval(updateClock, 1000);
    
    // Event listeners
    document.getElementById('setAlarmBtn').addEventListener('click', setAlarm);
    document.getElementById('stopAlarmBtn').addEventListener('click', stopAlarm);
    document.getElementById('snoozeBtn').addEventListener('click', snoozeAlarm);
    document.getElementById('closeModal').addEventListener('click', stopAlarm);
    document.getElementById('snoozeAllBtn').addEventListener('click', snoozeAllAlarms);
    document.getElementById('enableAudioBtn').addEventListener('click', enableAudio);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === alarmModal) stopAlarm();
    });
    
    // Initialize minute dropdown properly
    const minuteSelect = document.getElementById('alarmMinute');
    if (minuteSelect && minuteSelect.options.length < 60) {
        for(let i=0;i<=59;i++) {
            if(![...minuteSelect.options].some(opt => opt.value == i)) {
                minuteSelect.add(new Option(i.toString().padStart(2,'0'), i));
            }
        }
    }
});

// Expose global functions for inline handlers
window.deleteAlarm = deleteAlarm;
window.snoozeSingleAlarm = snoozeSingleAlarm;