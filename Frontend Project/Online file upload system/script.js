const dropZone = document.getElementById('drop-zone');
const fileInput = document.getElementById('file-input');
const fileList = document.getElementById('file-list');

// Open file selector on click
dropZone.onclick = () => fileInput.click();

// Handle Drag & Drop styles
dropZone.ondragover = (e) => { e.preventDefault(); dropZone.classList.add('active'); };
dropZone.ondragleave = () => dropZone.classList.remove('active');

dropZone.ondrop = (e) => {
    e.preventDefault();
    dropZone.classList.remove('active');
    handleFiles(e.dataTransfer.files);
};

fileInput.onchange = () => handleFiles(fileInput.files);

function handleFiles(files) {
    Array.from(files).forEach(uploadFile);
}

function uploadFile(file) {
    const item = document.createElement('div');
    item.className = 'file-item';
    item.innerHTML = `
        <div style="font-size: 0.9rem; font-weight: 600;">${file.name}</div>
        <div class="progress-bar"><div class="progress-fill"></div></div>
    `;
    fileList.appendChild(item);

    const fill = item.querySelector('.progress-fill');
    
    // Simulating Upload Progress
    let progress = 0;
    const interval = setInterval(() => {
        progress += Math.random() * 20;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            item.style.border = "1px solid #10b981";
        }
        fill.style.width = progress + "%";
    }, 300);
}