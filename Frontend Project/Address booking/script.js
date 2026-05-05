// Local memory state loaded with placeholder contacts
const contacts = [
    { id: 1, name: "Alice Johnson", phone: "555-019-2834", email: "alice.j@example.com", category: "Work", address: "456 Corporate Blvd" },
    { id: 2, name: "David Miller", phone: "555-014-9982", email: "david.m@example.com", category: "Personal", address: "789 Elm Street" }
];

const contactForm = document.getElementById('contactForm');
const contactTableBody = document.getElementById('contactTableBody');

// Render contacts list in table format
function renderContacts(contactsToDisplay = contacts) {
    if (contactsToDisplay.length === 0) {
        contactTableBody.innerHTML = `
            <tr>
                <td colspan="5" style="text-align: center; color: var(--text-muted); padding: 30px;">
                    No contacts found.
                </td>
            </tr>
        `;
        return;
    }

    contactTableBody.innerHTML = contactsToDisplay.map(c => `
        <tr>
            <td><strong>${c.name}</strong></td>
            <td>
                <div>${c.phone}</div>
                <div class="contact-email">${c.email}</div>
            </td>
            <td>
                <span class="badge badge-${c.category.toLowerCase()}">${c.category}</span>
            </td>
            <td style="color: var(--text-muted);">${c.address}</td>
            <td>
                <button class="btn-delete" onclick="deleteContact(${c.id})">Delete</button>
            </td>
        </tr>
    `).join('');
}

// Client-side quick filter function
function searchContacts() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const filtered = contacts.filter(c => 
        c.name.toLowerCase().includes(query) || 
        c.email.toLowerCase().includes(query) || 
        c.category.toLowerCase().includes(query)
    );
    renderContacts(filtered);
}

// Intercept Add Form Submission
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phoneNumber').value.trim();
    const email = document.getElementById('emailAddress').value.trim();
    const category = document.getElementById('category').value;
    const address = document.getElementById('physicalAddress').value.trim();

    // Push new contact to storage array
    contacts.unshift({
        id: Date.now(),
        name,
        phone,
        email,
        category,
        address
    });

    // Refresh UI
    renderContacts();
    contactForm.reset();
});

// Remove a contact
function deleteContact(id) {
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
        contacts.splice(index, 1);
        renderContacts();
    }
}

// Initial execution invocation
renderContacts();