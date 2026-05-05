// DOM Elements
let fileInput, dropZone, browseBtn;
let qualitySlider, qualityValue;
let outputFormat, preserveDimensions, autoDownload;
let originalPreview, compressedPreview;
let originalInfo, compressedInfo;
let originalSizeSpan, compressedSizeSpan, spaceSavedSpan, reductionPercentSpan;
let compressBtn, downloadBtn, resetBtn;
let compressionProgress;
let statsCard;

// State variables
let originalFile = null;
let originalImageData = null;
let compressedBlob = null;
let originalImageUrl = null;
let compressedImageUrl = null;

// Initialize DOM references
function initDOMElements() {
    fileInput = document.getElementById('fileInput');
    dropZone = document.getElementById('dropZone');
    browseBtn = document.getElementById('browseBtn');
    qualitySlider = document.getElementById('qualitySlider');
    qualityValue = document.getElementById('qualityValue');
    outputFormat = document.getElementById('outputFormat');
    preserveDimensions = document.getElementById('preserveDimensions');
    autoDownload = document.getElementById('autoDownload');
    originalPreview = document.getElementById('originalPreview');
    compressedPreview = document.getElementById('compressedPreview');
    originalInfo = document.getElementById('originalInfo');
    compressedInfo = document.getElementById('compressedInfo');
    originalSizeSpan = document.getElementById('originalSize');
    compressedSizeSpan = document.getElementById('compressedSize');
    spaceSavedSpan = document.getElementById('spaceSaved');
    reductionPercentSpan = document.getElementById('reductionPercent');
    compressBtn = document.getElementById('compressBtn');
    downloadBtn = document.getElementById('downloadBtn');
    resetBtn = document.getElementById('resetBtn');
    compressionProgress = document.getElementById('compressionProgress');
    statsCard = document.getElementById('statsCard');
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Update quality slider display
function updateQualityDisplay() {
    qualityValue.textContent = qualitySlider.value;
}

// Handle file selection
function handleFile(file) {
    if (!file) return;
    
    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
        alert('File size exceeds 10MB limit. Please choose a smaller image.');
        return;
    }
    
    // Check file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!validTypes.includes(file.type)) {
        alert('Please upload a valid image (JPEG, PNG, or WebP).');
        return;
    }
    
    originalFile = file;
    
    // Display original image preview
    if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
    }
    originalImageUrl = URL.createObjectURL(file);
    originalPreview.innerHTML = `<img src="${originalImageUrl}" alt="Original">`;
    originalInfo.textContent = `${formatFileSize(file.size)} | ${file.type.split('/')[1].toUpperCase()}`;
    originalSizeSpan.textContent = formatFileSize(file.size);
    
    // Reset compressed area
    compressedPreview.innerHTML = `<span>Click "Compress Now"</span>`;
    compressedInfo.textContent = '';
    compressedBlob = null;
    if (compressedImageUrl) {
        URL.revokeObjectURL(compressedImageUrl);
        compressedImageUrl = null;
    }
    compressBtn.disabled = false;
    downloadBtn.disabled = true;
    statsCard.style.display = 'none';
}

// Load image and compress
async function compressImage() {
    if (!originalFile) {
        alert('Please select an image first.');
        return;
    }
    
    // Show loading state
    compressBtn.disabled = true;
    compressBtn.innerHTML = '<div class="loading-spinner"></div> Compressing...';
    
    try {
        const quality = parseInt(qualitySlider.value) / 100;
        let outputMimeType = outputFormat.value;
        
        // If output format is "original", use original file type
        if (outputMimeType === 'original') {
            outputMimeType = originalFile.type;
        }
        
        // Load image
        const img = await loadImage(originalImageUrl);
        
        // Get dimensions
        let width = img.width;
        let height = img.height;
        
        // Create canvas
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Compress
        const compressedDataUrl = canvas.toDataURL(outputMimeType, quality);
        
        // Convert dataURL to Blob
        const blob = dataURLToBlob(compressedDataUrl);
        compressedBlob = blob;
        
        // Display compressed preview
        if (compressedImageUrl) {
            URL.revokeObjectURL(compressedImageUrl);
        }
        compressedImageUrl = URL.createObjectURL(blob);
        compressedPreview.innerHTML = `<img src="${compressedImageUrl}" alt="Compressed">`;
        
        // Update stats
        const originalSize = originalFile.size;
        const compressedSize = blob.size;
        const saved = originalSize - compressedSize;
        const reduction = ((saved / originalSize) * 100).toFixed(1);
        
        compressedInfo.textContent = `${formatFileSize(compressedSize)} | ${outputMimeType.split('/')[1].toUpperCase()}`;
        compressedSizeSpan.textContent = formatFileSize(compressedSize);
        spaceSavedSpan.textContent = formatFileSize(saved);
        reductionPercentSpan.textContent = `${reduction}%`;
        
        // Update progress bar (visual effect)
        const progressPercent = Math.min(100, (saved / originalSize) * 200);
        compressionProgress.style.width = `${Math.min(100, progressPercent)}%`;
        
        statsCard.style.display = 'block';
        downloadBtn.disabled = false;
        
        // Auto download if checked
        if (autoDownload.checked) {
            downloadCompressedImage();
        }
        
    } catch (error) {
        console.error('Compression error:', error);
        alert('Error compressing image. Please try again.');
    } finally {
        compressBtn.disabled = false;
        compressBtn.innerHTML = '⚡ Compress Now';
    }
}

// Load image helper
function loadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve(img);
        img.onerror = reject;
        img.src = url;
    });
}

// Convert dataURL to Blob
function dataURLToBlob(dataURL) {
    const arr = dataURL.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], { type: mime });
}

// Download compressed image
function downloadCompressedImage() {
    if (!compressedBlob) {
        alert('No compressed image available. Please compress first.');
        return;
    }
    
    // Generate filename
    const originalName = originalFile.name.split('.')[0];
    const extension = compressedBlob.type.split('/')[1];
    const filename = `${originalName}_compressed.${extension}`;
    
    // Create download link
    const url = URL.createObjectURL(compressedBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Reset everything
function resetAll() {
    originalFile = null;
    if (originalImageUrl) {
        URL.revokeObjectURL(originalImageUrl);
        originalImageUrl = null;
    }
    if (compressedImageUrl) {
        URL.revokeObjectURL(compressedImageUrl);
        compressedImageUrl = null;
    }
    compressedBlob = null;
    
    originalPreview.innerHTML = '<span>No image selected</span>';
    compressedPreview.innerHTML = '<span>Waiting for compression</span>';
    originalInfo.textContent = '';
    compressedInfo.textContent = '';
    originalSizeSpan.textContent = '-';
    compressedSizeSpan.textContent = '-';
    spaceSavedSpan.textContent = '-';
    reductionPercentSpan.textContent = '-';
    compressionProgress.style.width = '0%';
    statsCard.style.display = 'none';
    compressBtn.disabled = true;
    downloadBtn.disabled = true;
    
    // Reset form values
    qualitySlider.value = '80';
    updateQualityDisplay();
    outputFormat.value = 'original';
    preserveDimensions.checked = true;
    autoDownload.checked = false;
    
    // Clear file input
    fileInput.value = '';
}

// Setup drag and drop
function setupDragAndDrop() {
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('drag-over');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('drag-over');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFile(files[0]);
        }
    });
    
    dropZone.addEventListener('click', () => {
        fileInput.click();
    });
    
    browseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        fileInput.click();
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleFile(e.target.files[0]);
        }
    });
}

// Event listeners
function setupEventListeners() {
    qualitySlider.addEventListener('input', () => {
        updateQualityDisplay();
        // Auto recompress if an image is loaded? optional, but we'll let user click compress
    });
    
    compressBtn.addEventListener('click', compressImage);
    downloadBtn.addEventListener('click', downloadCompressedImage);
    resetBtn.addEventListener('click', resetAll);
}

// Initialize app
function init() {
    initDOMElements();
    setupDragAndDrop();
    setupEventListeners();
    updateQualityDisplay();
}

// Start the app when DOM is ready
document.addEventListener('DOMContentLoaded', init);