const pmForm = document.getElementById('pm-form');
const passList = document.getElementById('password-list');
const genBtn = document.getElementById('gen-btn');
const passInput = document.getElementById('password');

let vault = JSON.parse(localStorage.getItem('vault_data')) || [];

// Password Generator Function
genBtn.onclick = () => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+";
    let generatedPass = "";
    for (let i = 0; i < 14; i++) {
        generatedPass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    passInput.value = generatedPass;
};

// Save to Vault
pmForm.onsubmit = (e) => {
    e.preventDefault();
    
    const newEntry = {
        id: Date.now(),
        site: document.getElementById('site').value,
        user: document.getElementById('username').value,
        pass: document.getElementById('password').value
    };

    vault.unshift(newEntry);
    localStorage.setItem('vault_data', JSON.stringify(vault));
    pmForm.reset();
    renderVault();
};

function renderVault() {
    passList.innerHTML = '';
    
    vault.forEach(item => {
        const div = document.createElement('div');
        div.className = 'vault-item';
        div.innerHTML = `
            <div class="item-details">
                <h4>${item.site}</h4>
                <p>${item.user}</p>
                <div class="saved-pass">${item.pass}</div>
            </div>
            <div class="actions">
                <button onclick="copyPass('${item.pass}')">Copy</button>
                <button onclick="deleteEntry(${item.id})" style="color:#ef4444">Delete</button>
            </div>
        `;
        passList.appendChild(div);
    });
}

window.copyPass = (text) => {
    navigator.clipboard.writeText(text);
    alert("Password copied to clipboard!");
};

window.deleteEntry = (id) => {
    vault = vault.filter(entry => entry.id !== id);
    localStorage.setItem('vault_data', JSON.stringify(vault));
    renderVault();
};

// Initial Load
renderVault();