const courses = [
    { id: 1, title: "Mastering C# & .NET 9", fee: 4999, duration: "8 Weeks", level: "Intermediate" },
    { id: 2, title: "UI/UX Design for VR", fee: 3500, duration: "6 Weeks", level: "Beginner" },
    { id: 3, title: "Unity 3D Pro Development", fee: 7500, duration: "12 Weeks", level: "Advanced" },
    { id: 4, title: "Full-Stack Web Dev", fee: 5999, duration: "10 Weeks", level: "All Levels" }
];

let cart = JSON.parse(localStorage.getItem('edu_cart')) || [];

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.add('hidden'));
    document.getElementById(`${pageId}-page`).classList.remove('hidden');
    if(pageId === 'checkout') renderCheckout();
}

function renderCourses() {
    const grid = document.getElementById('course-grid');
    grid.innerHTML = courses.map(c => `
        <div class="card">
            <div class="course-info">
                <span class="tag">${c.level}</span>
                <h3>${c.title}</h3>
                <p class="details">⏳ ${c.duration} | Live Online Sessions</p>
                <div class="price-row">
                    <span class="fee">₹${c.fee}</span>
                    <button class="btn-enroll" onclick="addToCart(${c.id})">Enroll</button>
                </div>
            </div>
        </div>
    `).join('');
}

function addToCart(id) {
    const course = courses.find(c => c.id === id);
    if (!cart.some(item => item.id === id)) {
        cart.push(course);
        updateUI();
        alert(`${course.title} added to your enrollment list!`);
    } else {
        alert("You have already added this course.");
    }
}

function updateUI() {
    localStorage.setItem('edu_cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
}

function renderCheckout() {
    const list = document.getElementById('cart-items');
    const total = document.getElementById('total-price');
    
    if (cart.length === 0) {
        list.innerHTML = "<p>Your cart is empty. Browse courses to get started.</p>";
        total.innerText = "₹0";
        return;
    }

    list.innerHTML = cart.map((item, index) => `
        <div style="display:flex; justify-content:space-between; margin-bottom:10px">
            <span>${item.title}</span>
            <span>₹${item.fee}</span>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer">✕</button>
        </div>
    `).join('');

    const sum = cart.reduce((acc, curr) => acc + curr.fee, 0);
    total.innerText = `₹${sum}`;
}

window.removeFromCart = (index) => {
    cart.splice(index, 1);
    updateUI();
    renderCheckout();
};

document.getElementById('payment-form').onsubmit = (e) => {
    e.preventDefault();
    alert("Payment Successful! Welcome to the course.");
    cart = [];
    updateUI();
    showPage('home');
};

// Initial Load
renderCourses();
updateUI();