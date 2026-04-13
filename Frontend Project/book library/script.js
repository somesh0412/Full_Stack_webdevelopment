const libraryGrid = document.getElementById('library-grid');
const bookForm = document.getElementById('book-form');
const bookModal = document.getElementById('book-modal');
const addBtn = document.getElementById('add-book-btn');
const closeBtn = document.querySelector('.close-btn');
const searchBar = document.getElementById('search-bar');
const filterBtns = document.querySelectorAll('.filter-btn');

let myLibrary = JSON.parse(localStorage.getItem('myLibrary')) || [];

addBtn.onclick = () => bookModal.style.display = 'block';
closeBtn.onclick = () => bookModal.style.display = 'none';

bookForm.onsubmit = (e) => {
    e.preventDefault();
    const newBook = {
        id: Date.now(),
        title: document.getElementById('title').value,
        author: document.getElementById('author').value,
        cover: document.getElementById('cover').value || 'https://via.placeholder.com/200x280?text=No+Cover',
        status: document.getElementById('status').value
    };
    
    myLibrary.push(newBook);
    updateStorage();
    bookForm.reset();
    bookModal.style.display = 'none';
    renderLibrary();
};

function renderLibrary(filter = 'all', search = '') {
    libraryGrid.innerHTML = '';
    
    const filtered = myLibrary.filter(book => {
        const matchesFilter = filter === 'all' || book.status === filter;
        const matchesSearch = book.title.toLowerCase().includes(search.toLowerCase()) || 
                              book.author.toLowerCase().includes(search.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    document.getElementById('book-count').innerText = `${filtered.length} Books`;

    filtered.forEach(book => {
        const card = document.createElement('div');
        card.className = 'book-card';
        card.innerHTML = `
            <img src="${book.cover}" class="book-cover" alt="Cover">
            <div class="book-info">
                <h3>${book.title}</h3>
                <p>by ${book.author}</p>
                <span class="status-tag status-${book.status.split(' ')[0]}">${book.status}</span>
                <button onclick="removeBook(${book.id})" style="display:block; margin-top:10px; background:none; border:none; color:red; cursor:pointer; font-size:0.8rem">Remove</button>
            </div>
        `;
        libraryGrid.appendChild(card);
    });
}

window.removeBook = (id) => {
    myLibrary = myLibrary.filter(b => b.id !== id);
    updateStorage();
    renderLibrary();
};

function updateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}

searchBar.oninput = (e) => renderLibrary('all', e.target.value);

filterBtns.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderLibrary(btn.dataset.filter);
    };
});

renderLibrary();