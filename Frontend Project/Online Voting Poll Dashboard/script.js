// Store polls array
let polls = [];

// Current filter state
let currentFilter = "all"; // all, active, closed

// Load from localStorage
function loadPollsFromStorage() {
    const stored = localStorage.getItem('online_polls');
    if (stored) {
        polls = JSON.parse(stored);
    } else {
        // Default sample poll
        polls = [
            {
                id: 'poll_1',
                question: "Which programming language should be prioritized for the next workshop?",
                options: ["JavaScript/TypeScript", "Python", "Java", "Go"],
                votes: [24, 42, 12, 8],
                status: "active",
                expiry: null,
                createdAt: new Date().toISOString()
            },
            {
                id: 'poll_2',
                question: "What's your preferred meeting time for team sync?",
                options: ["Morning (9-10 AM)", "Afternoon (2-3 PM)", "Evening (5-6 PM)"],
                votes: [15, 28, 10],
                status: "active",
                expiry: null,
                createdAt: new Date().toISOString()
            }
        ];
        savePollsToStorage();
    }
    renderPolls();
    updateTotalVotes();
}

function savePollsToStorage() {
    localStorage.setItem('online_polls', JSON.stringify(polls));
}

function updateTotalVotes() {
    const total = polls.reduce((sum, poll) => {
        return sum + poll.votes.reduce((a, b) => a + b, 0);
    }, 0);
    document.getElementById('totalVotes').innerText = total;
}

// Helper: generate unique ID
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 6);
}

// Create new poll
function createPoll(question, optionsArray, status, expiryDate) {
    if (!question.trim()) {
        alert("Please enter a poll question");
        return false;
    }
    if (optionsArray.length < 2) {
        alert("Please add at least 2 options");
        return false;
    }
    const newPoll = {
        id: generateId(),
        question: question.trim(),
        options: optionsArray.map(opt => opt.trim()),
        votes: new Array(optionsArray.length).fill(0),
        status: status,
        expiry: expiryDate || null,
        createdAt: new Date().toISOString()
    };
    polls.unshift(newPoll);
    savePollsToStorage();
    renderPolls();
    updateTotalVotes();
    return true;
}

// Vote for an option
function castVote(pollId, optionIndex) {
    const poll = polls.find(p => p.id === pollId);
    if (!poll) return false;
    
    // Check if poll is active
    if (poll.status !== 'active') {
        alert("This poll is closed. Cannot vote.");
        return false;
    }
    
    // Check expiry if set
    if (poll.expiry) {
        const expiryTime = new Date(poll.expiry).getTime();
        if (Date.now() > expiryTime) {
            alert("This poll has expired. Cannot vote.");
            poll.status = "closed";
            savePollsToStorage();
            renderPolls();
            return false;
        }
    }
    
    // Check if user already voted in this poll (using localStorage per poll)
    const votedKey = `voted_${pollId}`;
    if (localStorage.getItem(votedKey) === 'true') {
        alert("You have already voted in this poll! 🙏");
        return false;
    }
    
    // Register vote
    poll.votes[optionIndex] += 1;
    localStorage.setItem(votedKey, 'true');
    savePollsToStorage();
    renderPolls();
    updateTotalVotes();
    alert("✅ Vote cast successfully!");
    return true;
}

// Delete poll
function deletePoll(pollId) {
    if (confirm("Are you sure you want to delete this poll permanently?")) {
        polls = polls.filter(p => p.id !== pollId);
        // Also clear voting records for that poll (optional)
        localStorage.removeItem(`voted_${pollId}`);
        savePollsToStorage();
        renderPolls();
        updateTotalVotes();
    }
}

// Toggle poll status (admin)
function togglePollStatus(pollId) {
    const poll = polls.find(p => p.id === pollId);
    if (poll) {
        poll.status = poll.status === 'active' ? 'closed' : 'active';
        savePollsToStorage();
        renderPolls();
    }
}

// Get filtered polls based on currentFilter
function getFilteredPolls() {
    if (currentFilter === 'all') return polls;
    return polls.filter(poll => poll.status === currentFilter);
}

// Render all polls to DOM
function renderPolls() {
    const container = document.getElementById('pollsList');
    const filtered = getFilteredPolls();
    
    if (filtered.length === 0) {
        container.innerHTML = `<div class="empty-state">📭 No polls found. Create a new poll or change filter.</div>`;
        return;
    }
    
    let html = '';
    filtered.forEach(poll => {
        const totalVotesForPoll = poll.votes.reduce((a, b) => a + b, 0);
        const isActive = poll.status === 'active';
        const expiryText = poll.expiry ? new Date(poll.expiry).toLocaleString() : 'No expiry';
        
        html += `
            <div class="poll-card" data-poll-id="${poll.id}">
                <div class="poll-header">
                    <div class="poll-question">📊 ${escapeHtml(poll.question)}</div>
                    <div class="status-badge ${isActive ? 'status-active' : 'status-closed'}">
                        ${isActive ? '● Active' : '● Closed'}
                    </div>
                </div>
                <div class="expiry-info">
                    <span>⏰ ${expiryText}</span>
                    <button class="secondary-btn" style="padding: 2px 10px; font-size:0.7rem;" onclick="togglePollStatus('${poll.id}')">
                        ${isActive ? '🔒 Close Poll' : '🔓 Reopen'}
                    </button>
                </div>
                <div class="vote-options">
                    ${poll.options.map((opt, idx) => {
                        const votesCount = poll.votes[idx];
                        const percentage = totalVotesForPoll === 0 ? 0 : (votesCount / totalVotesForPoll * 100).toFixed(1);
                        return `
                            <div class="option-row">
                                <span class="option-label">${escapeHtml(opt)}</span>
                                <button class="vote-btn" ${!isActive ? 'disabled' : ''} onclick="castVote('${poll.id}', ${idx})">Vote</button>
                                <div class="progress-bar-container">
                                    <div class="progress-fill" style="width: ${percentage}%;"></div>
                                </div>
                                <span class="vote-count">${votesCount} (${percentage}%)</span>
                            </div>
                        `;
                    }).join('')}
                </div>
                <div class="poll-footer">
                    <span style="font-size:0.7rem; color:#64748b;">Total votes: ${totalVotesForPoll}</span>
                    <button class="delete-poll-btn" onclick="deletePoll('${poll.id}')">🗑️ Delete Poll</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;
}

// Simple XSS prevention
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

// Initialize form handlers
function initFormHandlers() {
    const form = document.getElementById('createPollForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const question = document.getElementById('pollQuestion').value;
        const optionInputs = document.querySelectorAll('.option-input');
        const options = Array.from(optionInputs).map(inp => inp.value).filter(v => v.trim() !== '');
        const status = document.getElementById('pollStatus').value;
        const expiry = document.getElementById('expiryDate').value || null;
        
        if (createPoll(question, options, status, expiry)) {
            form.reset();
            // Reset options to default 2 fields
            resetOptionsToDefault();
            document.getElementById('pollQuestion').focus();
        }
    });
    
    // Add option button
    document.getElementById('addOptionBtn').addEventListener('click', () => {
        const container = document.getElementById('optionsContainer');
        const optionCount = container.querySelectorAll('.option-input-group').length;
        if (optionCount >= 6) {
            alert("Maximum 6 options allowed per poll");
            return;
        }
        const newGroup = document.createElement('div');
        newGroup.className = 'option-input-group';
        newGroup.innerHTML = `
            <input type="text" class="option-input" placeholder="Option ${optionCount + 1}" required>
            <button type="button" class="remove-option">✖</button>
        `;
        container.appendChild(newGroup);
        attachRemoveEvent(newGroup.querySelector('.remove-option'));
    });
    
    // Load sample poll button
    document.getElementById('loadSamplePollBtn').addEventListener('click', () => {
        const sampleQuestion = "What's your favorite study spot on campus?";
        const sampleOptions = ["Library", "Study Lounge", "Coffee Shop", "Outdoor benches"];
        createPoll(sampleQuestion, sampleOptions, "active", null);
        alert("📊 Sample poll added successfully!");
    });
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.getAttribute('data-filter');
            renderPolls();
        });
    });
}

function attachRemoveEvent(btn) {
    btn.addEventListener('click', function() {
        const container = document.getElementById('optionsContainer');
        const groups = container.querySelectorAll('.option-input-group');
        if (groups.length <= 2) {
            alert("You need at least 2 options for a poll");
            return;
        }
        this.closest('.option-input-group').remove();
    });
}

function resetOptionsToDefault() {
    const container = document.getElementById('optionsContainer');
    container.innerHTML = `
        <div class="option-input-group">
            <input type="text" class="option-input" placeholder="Option 1" required>
            <button type="button" class="remove-option" disabled>✖</button>
        </div>
        <div class="option-input-group">
            <input type="text" class="option-input" placeholder="Option 2" required>
            <button type="button" class="remove-option" disabled>✖</button>
        </div>
    `;
    // Re-attach events (disabled buttons have no effect)
    const removeBtns = container.querySelectorAll('.remove-option');
    removeBtns.forEach(btn => {
        btn.disabled = true;
    });
}

// Auto-check expiry and update status on load
function checkExpiredPolls() {
    let updated = false;
    polls.forEach(poll => {
        if (poll.status === 'active' && poll.expiry) {
            if (Date.now() > new Date(poll.expiry).getTime()) {
                poll.status = 'closed';
                updated = true;
            }
        }
    });
    if (updated) {
        savePollsToStorage();
        renderPolls();
    }
}

// Make functions globally accessible for inline onclick
window.castVote = castVote;
window.deletePoll = deletePoll;
window.togglePollStatus = togglePollStatus;

// Initialize dashboard
function init() {
    loadPollsFromStorage();
    initFormHandlers();
    resetOptionsToDefault();
    checkExpiredPolls();
    setInterval(checkExpiredPolls, 30000); // check every 30 sec
}

init();