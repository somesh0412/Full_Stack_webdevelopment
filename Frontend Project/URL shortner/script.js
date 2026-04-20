const form = document.getElementById('shortener-form');
const resultBox = document.getElementById('result-box');
const shortUrlText = document.getElementById('short-url-text');
const linksList = document.getElementById('links-list');

let db = JSON.parse(localStorage.getItem('ziplink_db')) || [];

// Function to generate a random 6-character slug
function generateSlug() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let slug = "";
    for (let i = 0; i < 6; i++) {
        slug += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return slug;
}

form.onsubmit = (e) => {
    e.preventDefault();
    const longUrl = document.getElementById('long-url').value;
    const slug = generateSlug();
    const shortUrl = `ziplink.co/${slug}`;

    const newLink = { longUrl, shortUrl, slug };
    db.unshift(newLink);
    localStorage.setItem('ziplink_db', JSON.stringify(db));

    // Show Result
    shortUrlText.innerText = shortUrl;
    resultBox.classList.remove('hidden');
    
    renderLinks();
    form.reset();
};

function renderLinks() {
    linksList.innerHTML = '';
    db.forEach(item => {
        const div = document.createElement('div');
        div.className = 'link-item';
        div.innerHTML = `
            <div>
                <div style="font-weight:700; color:#3b82f6">${item.shortUrl}</div>
                <div class="long">${item.longUrl}</div>
            </div>
            <button onclick="copyLink('${item.shortUrl}')" style="background:none; border:none; color:#64748b; cursor:pointer">Copy</button>
        `;
        linksList.appendChild(div);
    });
}

window.copyLink = (text) => {
    const linkToCopy = text || shortUrlText.innerText;
    navigator.clipboard.writeText(linkToCopy);
    alert("Copied to clipboard!");
};

// Initial Load
renderLinks();