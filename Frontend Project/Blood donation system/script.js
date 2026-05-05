// Base Memory State
let inventory = {
    "A+": 450,
    "A-": 0,
    "B+": 900,
    "B-": 0,
    "O+": 1350,
    "O-": 450,
    "AB+": 0,
    "AB-": 0
};

const donors = [
    { name: "Suresh Patil", age: 34, bloodType: "O+", units: 450, contact: "9876543210", date: "2026-05-01" },
    { name: "Anjali Gupta", age: 28, bloodType: "B+", units: 450, contact: "9123456789", date: "2026-05-02" }
];

const donorForm = document.getElementById('donorForm');
const donorTableBody = document.getElementById('donorTableBody');
const stockContainer = document.getElementById('stockContainer');

// Render inventory modules
function renderStockGrid() {
    stockContainer.innerHTML = Object.keys(inventory).map(type => {
        const value = inventory[type];
        return `
            <div class="stock-card ${value > 0 ? 'has-stock' : ''}">
                <div class="blood-type">${type}</div>
                <div class="blood-units">${value} mL</div>
                <div class="blood-desc">${value > 0 ? 'Available' : 'Out of Stock'}</div>
            </div>
        `;
    }).join('');
}

// Render donor log rows
function renderDonorTable() {
    donorTableBody.innerHTML = donors.map(d => `
        <tr>
            <td><strong>${d.name}</strong></td>
            <td>${d.age} yrs</td>
            <td><span style="color:var(--primary); font-weight:bold;">${d.bloodType}</span></td>
            <td>${d.units} mL</td>
            <td>${d.contact}</td>
            <td>${d.date}</td>
        </tr>
    `).join('');
}

// Intercept registration submission
donorForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullName = document.getElementById('fullName').value.trim();
    const age = parseInt(document.getElementById('age').value);
    const bloodType = document.getElementById('bloodType').value;
    const units = parseInt(document.getElementById('units').value);
    const contact = document.getElementById('contact').value.trim();
    const currentDate = new Date().toISOString().split('T')[0];

    // Append new donor records to table model
    donors.unshift({
        name: fullName,
        age: age,
        bloodType: bloodType,
        units: units,
        contact: contact,
        date: currentDate
    });

    // Update the aggregate total
    inventory[bloodType] += units;

    // Refresh display layers
    renderStockGrid();
    renderDonorTable();

    // Clear form fields
    donorForm.reset();
});

// Primary render invocation
renderStockGrid();
renderDonorTable();