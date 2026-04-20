const imageGrid = document.getElementById('image-grid');
const uploadInput = document.getElementById('upload-input');
const searchBar = document.getElementById('search-bar');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

// Load images from local storage (storing base64 strings)
let gallery = JSON.parse(localStorage.getItem('pixelvault_images')) || [];

// Handle File Upload
uploadInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const newImg = {
                id: Date.now(),
                src: event.target.result,
                name: file.name
            };
            gallery.unshift(newImg);
            localStorage.setItem('pixelvault_images', JSON.stringify(gallery));
            renderGallery(gallery);
        };
        reader.readAsDataURL(file);
    }
});

function renderGallery(items) {
    imageGrid.innerHTML = '';
    items.forEach(img => {
        const card = document.createElement('div');
        card.className = 'img-card';
        card.innerHTML = `
            <img src="${img.src}" alt="${img.name}" onclick="openLightbox('${img.src}')">
            <div class="img-overlay">
                <span style="font-size: 0.8rem; color: #ccc;">${img.name}</span>
                <button onclick="deleteImg(${img.id})" style="margin-left: auto; background: none; border: none; color: #ef4444; cursor: pointer;">🗑️</button>
            </div>
        `;
        imageGrid.appendChild(card);
    });
}

function filterImages() {
    const term = searchBar.value.toLowerCase();
    const filtered = gallery.filter(img => img.name.toLowerCase().includes(term));
    renderGallery(filtered);
}

function openLightbox(src) {
    lightbox.style.display = "block";
    lightboxImg.src = src;
}

function closeLightbox() {
    lightbox.style.display = "none";
}

window.deleteImg = (id) => {
    event.stopPropagation(); // Prevent lightbox from opening
    gallery = gallery.filter(img => img.id !== id);
    localStorage.setItem('pixelvault_images', JSON.stringify(gallery));
    renderGallery(gallery);
};

// Initial Load
renderGallery(gallery);