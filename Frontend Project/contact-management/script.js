const contactForm = document.getElementById('contact-form');
const contactList = document.getElementById('contact-list');
const searchInput = document.getElementById('search');

let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Render Contacts
function displayContacts(filter = '') {
    contactList.innerHTML = '';
    
    const filteredContacts = contacts.filter(c => 
        c.name.toLowerCase().includes(filter.toLowerCase())
    );

    if (filteredContacts.length === 0) {
        contactList.innerHTML = '<p style="text-align:center; color:#94a3b8;">No contacts found.</p>';
        return;
    }

    filteredContacts.forEach((contact, index) => {
        const card = document.createElement('div');
        card.className = 'contact-card';
        card.innerHTML = `
            <div class="contact-info">
                <h4>${contact.name}</h4>
                <p>📞 ${contact.phone}</p>
                <p>✉️ ${contact.email}</p>
            </div>
            <button class="btn-delete" onclick="deleteContact(${index})">Delete</button>
        `;
        contactList.appendChild(card);
    });
}

// Add Contact
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const newContact = {
        name: document.getElementById('name').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value
    };

    contacts.push(newContact);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    contactForm.reset();
    displayContacts();
});

// Delete Contact
window.deleteContact = (index) => {
    contacts.splice(index, 1);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    displayContacts();
};

// Search Filter
searchInput.addEventListener('input', (e) => {
    displayContacts(e.target.value);
});

// Initial Load
displayContacts();