const products = [
    { id: 1, name: "Velocity Runner", price: 120, img: "https://images.unsplash.com/photo-1542291026-7eec264c27dd?w=500" },
    { id: 2, name: "Urban Stride", price: 95, img: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=500" },
    { id: 3, name: "Peak Climber", price: 150, img: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=500" }
];

function renderProducts() {
    const container = document.getElementById('product-list');
    container.innerHTML = products.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}" class="product-image">
            <h3>${p.name}</h3>
            <p class="price">$${p.price}</p>
            <button class="btn-buy" onclick="addToCart('${p.name}')">Add to Cart</button>
        </div>
    `).join('');
}

function addToCart(name) {
    alert(`${name} has been added to your cart!`);
}

renderProducts();