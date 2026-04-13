const pollData = {
    question: "What is your preferred programming language for 2026?",
    options: ["JavaScript", "Python", "C#", "Rust", "Go"]
};

// Initialize vote counts from Local Storage or set to zero
let votes = JSON.parse(localStorage.getItem('poll_votes')) || 
            new Array(pollData.options.length).fill(0);

const pollOptionsContainer = document.getElementById('poll-options');
const resultsContainer = document.getElementById('results-container');
const totalVotesEl = document.getElementById('total-votes');

function renderPoll() {
    pollOptionsContainer.innerHTML = '';
    pollData.options.forEach((option, index) => {
        const div = document.createElement('div');
        div.className = 'poll-option';
        div.innerText = option;
        div.onclick = () => handleVote(index);
        pollOptionsContainer.appendChild(div);
    });
    updateTotal();
}

function handleVote(index) {
    votes[index]++;
    localStorage.setItem('poll_votes', JSON.stringify(votes));
    showResults();
}

function showResults() {
    pollOptionsContainer.classList.add('hidden');
    resultsContainer.classList.remove('hidden');
    
    const resultsList = document.getElementById('results-list');
    resultsList.innerHTML = '';
    
    const total = votes.reduce((a, b) => a + b, 0);
    
    pollData.options.forEach((option, index) => {
        const percentage = total === 0 ? 0 : Math.round((votes[index] / total) * 100);
        
        const wrapper = document.createElement('div');
        wrapper.className = 'result-wrapper';
        wrapper.innerHTML = `
            <div class="result-label">
                <span>${option}</span>
                <span>${percentage}% (${votes[index]})</span>
            </div>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${percentage}%"></div>
            </div>
        `;
        resultsList.appendChild(wrapper);
    });
    updateTotal();
}

function updateTotal() {
    const total = votes.reduce((a, b) => a + b, 0);
    totalVotesEl.innerText = `Total Votes: ${total}`;
}

function resetPoll() {
    localStorage.removeItem('poll_votes');
    votes = new Array(pollData.options.length).fill(0);
    resultsContainer.classList.add('hidden');
    pollOptionsContainer.classList.remove('hidden');
    renderPoll();
}

// Check if user should see results immediately
if (votes.some(v => v > 0)) {
    // In a real app, you'd check a "hasVoted" flag. 
    // Here we just render the poll to start.
    renderPoll();
} else {
    renderPoll();
}