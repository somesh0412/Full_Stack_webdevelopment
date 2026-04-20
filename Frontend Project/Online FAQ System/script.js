const faqData = [
    {
        question: "How do I reset my password?",
        answer: "Navigate to the login page and click 'Forgot Password'. You will receive an email with a secure link to create a new one.",
        category: "account"
    },
    {
        question: "What payment methods do you accept?",
        answer: "We currently accept all major credit cards (Visa, Mastercard, AMEX), PayPal, and Apple Pay.",
        category: "billing"
    },
    {
        question: "Can I cancel my subscription anytime?",
        answer: "Yes, you can cancel your plan at any time through your dashboard settings. You will have access until the end of your billing cycle.",
        category: "billing"
    },
    {
        question: "Is there a mobile app available?",
        answer: "Currently, our platform is fully optimized for mobile browsers, and our native app is scheduled for release in late 2026.",
        category: "general"
    }
];

const faqContainer = document.getElementById('faq-container');
const noResults = document.getElementById('no-results');

function renderFAQs(items) {
    faqContainer.innerHTML = '';
    if (items.length === 0) {
        noResults.classList.remove('hidden');
        return;
    }
    
    noResults.classList.add('hidden');
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'faq-item';
        div.innerHTML = `
            <button class="faq-question" onclick="toggleFAQ(this)">
                ${item.question}
            </button>
            <div class="faq-answer">
                <p>${item.answer}</p>
            </div>
        `;
        faqContainer.appendChild(div);
    });
}

window.toggleFAQ = (element) => {
    const parent = element.parentElement;
    const isActive = parent.classList.contains('active');
    
    // Close all other open FAQs
    document.querySelectorAll('.faq-item').forEach(item => item.classList.remove('active'));
    
    // Toggle current one
    if (!isActive) {
        parent.classList.add('active');
    }
};

window.searchFAQ = () => {
    const term = document.getElementById('faq-search').value.toLowerCase();
    const filtered = faqData.filter(faq => 
        faq.question.toLowerCase().includes(term) || 
        faq.answer.toLowerCase().includes(term)
    );
    renderFAQs(filtered);
};

// Initial Load
renderFAQs(faqData);