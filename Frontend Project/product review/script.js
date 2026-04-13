const reviewGrid = document.getElementById('review-grid');
const reviewForm = document.getElementById('review-form');
const modal = document.getElementById('review-modal');
const addBtn = document.getElementById('add-review-btn');
const closeBtn = document.querySelector('.close-btn');

let reviews = JSON.parse(localStorage.getItem('product_reviews')) || [
    {
        id: 1,
        name: "Zenith Wireless Headphones",
        rating: 5,
        pro: "Active Noise Cancelling",
        con: "Bulky case",
        desc: "Best audio quality I have experienced in years. The battery lasts for about 40 hours."
    }
];

// Modal Controls
addBtn.onclick = () => modal.style.display = 'block';
closeBtn.onclick = () => modal.style.display = 'none';

reviewForm.onsubmit = (e) => {
    e.preventDefault();
    
    const newReview = {
        id: Date.now(),
        name: document.getElementById('p-name').value,
        rating: document.getElementById('p-rating').value,
        pro: document.getElementById('p-pros').value,
        con: document.getElementById('p-cons').value,
        desc: document.getElementById('p-desc').value
    };

    reviews.unshift(newReview);
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
    reviewForm.reset();
    modal.style.display = 'none';
    renderReviews();
};

function renderReviews() {
    reviewGrid.innerHTML = '';
    
    reviews.forEach(rv => {
        const starHTML = '★'.repeat(rv.rating) + '☆'.repeat(5 - rv.rating);
        const card = document.createElement('div');
        card.className = 'review-card';
        card.innerHTML = `
            <div class="stars">${starHTML}</div>
            <h3>${rv.name}</h3>
            <div class="pros-cons-box">
                <span class="pro">▲ ${rv.pro}</span>
                <span class="con">▼ ${rv.con}</span>
            </div>
            <p class="desc">${rv.desc}</p>
            <button onclick="deleteReview(${rv.id})" style="margin-top:15px; background:none; border:none; color:#94a3b8; cursor:pointer; font-size:0.8rem">Delete Review</button>
        `;
        reviewGrid.appendChild(card);
    });
}

window.deleteReview = (id) => {
    reviews = reviews.filter(r => r.id !== id);
    localStorage.setItem('product_reviews', JSON.stringify(reviews));
    renderReviews();
};

// Initial Load
renderReviews();