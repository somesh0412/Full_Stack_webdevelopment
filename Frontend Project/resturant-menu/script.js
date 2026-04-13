const menuData = [
    { id: 1, name: "Truffle Pasta", price: 850, desc: "Creamy linguine with black truffle and parmesan." },
    { id: 2, name: "Grilled Salmon", price: 1200, desc: "Fresh Atlantic salmon with lemon butter sauce." },
    { id: 3, name: "Margherita Pizza", price: 550, desc: "Hand-stretched dough with fresh basil and mozzarella." },
    { id: 4, name: "Chocolate Fondant", price: 400, desc: "Warm lava cake with Madagascan vanilla gelato." }
];

let cart = JSON.parse(localStorage.getItem('restaurant-cart')) || [];

// Navigation
function showSection(sectionId) {
    document.querySelectorAll('.content-section').forEach(s => s.classList.add('hidden'));
    document.getElementById(`${sectionId}-section`).classList.remove('hidden');
    if(sectionId === 'order') renderCart();
}

// Render Menu
function renderMenu() {
    const grid = document.getElementById('menu-grid');
    grid.innerHTML = menuData.map(item => `
        <div class="menu-item">
            <div class="item-info">
                <h3>${item.name}</h3>
                <p style="color:#888; font-size:0.9rem">${item.desc}</p>
                <div style="margin-top:15px; display:flex; justify-content:space-between; align-items:center">
                    <span class="price">₹${item.price}</span>
                    <button class="btn-add" onclick="addToCart(${item.id})" style="width:auto">Add to Order</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Cart Logic
function addToCart(id) {
    const item = menuData.find(i => i.id === id);
    cart.push(item);
    updateCart();
}

function updateCart() {
    localStorage.setItem('restaurant-cart', JSON.stringify(cart));
    document.getElementById('cart-count').innerText = cart.length;
}

function renderCart() {
    const list = document.getElementById('cart-items');
    const total = document.getElementById('total-price');
    list.innerHTML = cart.map((item, index) => `
        <li style="display:flex; justify-content:space-between; padding:10px 0; border-bottom:1px solid #333">
            ${item.name} <span>₹${item.price}</span>
            <button onclick="removeFromCart(${index})" style="background:none; border:none; color:red; cursor:pointer">✕</button>
        </li>
    `).join('');
    
    const sum = cart.reduce((acc, curr) => acc + curr.price, 0);
    total.innerText = sum;
}

function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
    renderCart();
}

function checkout() {
    if(cart.length === 0) return alert("Your cart is empty!");
    alert("Order Received! Preparing your delicious meal.");
    cart = [];
    updateCart();
    showSection('menu');
}

// Feedback Submission
document.getElementById('feedback-form').onsubmit = (e) => {
    e.preventDefault();
    alert("Thank you for your feedback! It helps us serve you better.");
    e.target.reset();
};

// Initial Load
renderMenu();
updateCart();