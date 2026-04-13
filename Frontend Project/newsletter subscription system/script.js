const subscribeForm = document.getElementById('subscribe-form');
const subCard = document.getElementById('subscription-card');
const successCard = document.getElementById('success-card');
const subscriberList = document.getElementById('subscriber-list');

// Load subscribers from storage
let subscribers = JSON.parse(localStorage.getItem('newsletter_subs')) || [];

function updateAdminView() {
    subscriberList.innerHTML = subscribers.map(email => `<li>${email}</li>`).join('');
}

subscribeForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('email-input').value;

    if (subscribers.includes(email)) {
        alert("You are already subscribed!");
        return;
    }

    // Save to "Database"
    subscribers.push(email);
    localStorage.setItem('newsletter_subs', JSON.stringify(subscribers));

    // UI Transition
    subCard.classList.add('hidden');
    successCard.classList.remove('hidden');
    updateAdminView();
};

function resetView() {
    successCard.classList.add('hidden');
    subCard.classList.remove('hidden');
    subscribeForm.reset();
}

// Initial Call
updateAdminView();