const stars = document.querySelectorAll('.star');
const feedbackForm = document.getElementById('feedback-form');
const feedbackList = document.getElementById('feedback-list');
const toggleBtn = document.getElementById('toggle-view');

let currentRating = 0;
let feedbacks = JSON.parse(localStorage.getItem('user-feedbacks')) || [];

// Star Selection Logic
stars.forEach(star => {
    star.addEventListener('click', () => {
        currentRating = star.dataset.value;
        updateStars(currentRating);
    });
});

function updateStars(val) {
    stars.forEach(s => {
        s.classList.toggle('active', s.dataset.value <= val);
    });
}

// Form Submission
feedbackForm.onsubmit = (e) => {
    e.preventDefault();
    if (currentRating === 0) return alert("Please select a star rating!");

    const newFeedback = {
        id: Date.now(),
        rating: currentRating,
        category: document.getElementById('fb-category').value,
        message: document.getElementById('fb-message').value,
        date: new Date().toLocaleDateString()
    };

    feedbacks.unshift(newFeedback);
    localStorage.setItem('user-feedbacks', JSON.stringify(feedbacks));
    
    // UI Feedback
    feedbackForm.reset();
    updateStars(0);
    currentRating = 0;
    renderFeedbacks();
    alert("Thank you! Your feedback has been saved.");
};

// Toggle History View
toggleBtn.onclick = () => {
    feedbackList.classList.toggle('hidden');
    toggleBtn.innerText = feedbackList.classList.contains('hidden') ? 'View History' : 'Hide History';
    renderFeedbacks();
};

function renderFeedbacks() {
    feedbackList.innerHTML = '';
    feedbacks.forEach(fb => {
        const item = document.createElement('div');
        item.className = 'fb-item';
        item.innerHTML = `
            <div style="display:flex; justify-content:space-between">
                <strong>${'★'.repeat(fb.rating)}</strong>
                <span class="badge">${fb.category}</span>
            </div>
            <p style="margin-top:8px; font-size:0.95rem">${fb.message}</p>
            <small style="color:#94a3b8">${fb.date}</small>
        `;
        feedbackList.appendChild(item);
    });
}