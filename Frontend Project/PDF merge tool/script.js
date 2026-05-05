// DOM Elements
let fileInput, dropZone, browseBtn;
let fileListContainer;
let mergeBtn, downloadBtn, resetBtn, clearAllBtn;
let moveUpBtn, moveDownBtn, reverseOrderBtn;
let addPageNumbers, compressOutput, outputFilename;
let progressContainer, mergeProgress, progressText;
let resultsSection, fileCountSpan;
let mergedCountSpan, outputSizeSpan, totalPagesSpan;

// State
let pdfFiles = []; // Array of { file, name, size, pages, arrayBuffer }
let mergedPdfBlob = null;
let fileOrderMap = [];

// Initialize DOM
function initDOMElements() {
    fileInput = document.getElementById('fileInput');
    dropZone = document.getElementById('dropZone');
    browseBtn = document.getElementById('browseBtn');
    fileListContainer = document.getElementById('fileList');
    mergeBtn = document.getElementById('mergeBtn');
    downloadBtn = document.getElementById('downloadBtn');
    resetBtn = document.getElementById('resetBtn');
    clearAllBtn = document.getElementById('clearAllBtn');
    moveUpBtn = document.getElementById('moveUpBtn');
    moveDownBtn = document.getElementById('moveDownBtn');
    reverseOrderBtn = document.getElementById('reverseOrderBtn');
    addPageNumbers = document.getElementById('addPageNumbers');
    compressOutput = document.getElementById('compressOutput');
    outputFilename = document.getElementById('outputFilename');
    progressContainer = document.getElementById('progressContainer');
    mergeProgress = document.getElementById('mergeProgress');
    progressText = document.getElementById('progressText');
    resultsSection = document.getElementById('resultsSection');
    fileCountSpan = document.getElementById('fileCount');
    mergedCountSpan = document.getElementById('mergedCount');
    outputSizeSpan = document.getElementById('outputSize');
    totalPagesSpan = document.getElementById('totalPages');
}

// Format file size
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Update file count badge
function updateFileCount() {
    fileCountSpan.textContent = `${pdfFiles.length} file${pdfFiles.length !== 1 ? 's' : ''}`;
    mergeBtn.disabled = pdfFiles.length < 2;
    
    // Update move buttons state
    const selectedIndex = getSelectedFileIndex();
    moveUpBtn.disabled = selectedIndex === -1 || selectedIndex === 0;
    moveDownBtn.disabled = selectedIndex === -1 || selectedIndex === pdfFiles.length - 1;
}

// Get selected file index (via data-selected attribute)
function getSelectedFileIndex() {
    const selected = document.querySelector('.file-item.selected');
    if (!selected) return -1;
    return parseInt(selected.getAttribute('data-index'));
}

// Clear selection
function clearSelection() {
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('selected');
    });
}

// Render file list with drag & drop support
function renderFileList() {
    if (pdfFiles.length === 0) {
        fileListContainer.innerHTML = '<div class="empty-state">No files added. Upload PDFs to merge.</div>';
        updateFileCount();
        return;
    }
    
    let html = '';
    pdfFiles.forEach((file, index) => {
        html += `
            <div class="file-item" draggable="true" data-index="${index}" data-filename="${escapeHtml(file.name)}">
                <div class="drag-handle">⋮⋮</div>
                <div class="file-icon">📄</div>
                <div class="file-info">
                    <div class="file-name">${escapeHtml(file.name)}</div>
                    <div class="file-size">${formatFileSize(file.size)} ${file.pages ? `| ${file.pages} pages` : ''}</div>
                </div>
                <div class="file-actions">
                    <button class="remove-file" data-index="${index}" title="Remove">✖</button>
                </div>
            </div>
        `;
    });
    fileListContainer.innerHTML = html;
    
    // Add event listeners
    document.querySelectorAll('.remove-file').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const idx = parseInt(btn.getAttribute('data-index'));
            removeFile(idx);
        });
    });
    
    // Add drag and drop listeners for reordering
    const items = document.querySelectorAll('.file-item');
    items.forEach(item => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.addEventListener('click', (e) => {
            if (e.target.classList.contains('remove-file')) return;
            clearSelection();
            item.classList.add('selected');
            updateFileCount();
        });
    });
    
    updateFileCount();
}

// Escape HTML
function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

let dragSourceIndex = null;

function handleDragStart(e) {
    const item = e.target.closest('.file-item');
    if (!item) return;
    dragSourceIndex = parseInt(item.getAttribute('data-index'));
    e.dataTransfer.effectAllowed = 'move';
    item.classList.add('dragging');
}

function handleDragOver(e) {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    const targetItem = e.target.closest('.file-item');
    if (!targetItem) return;
    const targetIndex = parseInt(targetItem.getAttribute('data-index'));
    if (dragSourceIndex !== null && dragSourceIndex !== targetIndex) {
        targetItem.classList.add('drag-over');
    }
}

function handleDrop(e) {
    e.preventDefault();
    const targetItem = e.target.closest('.file-item');
    if (!targetItem) return;
    const targetIndex = parseInt(targetItem.getAttribute('data-index'));
    
    if (dragSourceIndex !== null && dragSourceIndex !== targetIndex) {
        // Reorder array
        const [movedFile] = pdfFiles.splice(dragSourceIndex, 1);
        pdfFiles.splice(targetIndex, 0, movedFile);
        renderFileList();
        clearSelection();
    }
    
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('drag-over');
    });
}

function handleDragEnd(e) {
    const item = e.target.closest('.file-item');
    if (item) item.classList.remove('dragging');
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('drag-over');
    });
    dragSourceIndex = null;
}

// Remove file
function removeFile(index) {
    pdfFiles.splice(index, 1);
    if (pdfFiles.length === 0) {
        mergedPdfBlob = null;
        resultsSection.style.display = 'none';
    }
    renderFileList();
}

// Clear all files
function clearAllFiles() {
    if (pdfFiles.length > 0 && confirm('Are you sure you want to remove all files?')) {
        pdfFiles = [];
        mergedPdfBlob = null;
        resultsSection.style.display = 'none';
        renderFileList();
    }
}

// Move file up
function moveUp() {
    const selectedIndex = getSelectedFileIndex();
    if (selectedIndex > 0) {
        [pdfFiles[selectedIndex - 1], pdfFiles[selectedIndex]] = [pdfFiles[selectedIndex], pdfFiles[selectedIndex - 1]];
        renderFileList();
        // Re-select the moved item
        setTimeout(() => {
            const newItem = document.querySelector(`.file-item[data-index="${selectedIndex - 1}"]`);
            if (newItem) newItem.classList.add('selected');
            updateFileCount();
        }, 50);
    }
}

// Move file down
function moveDown() {
    const selectedIndex = getSelectedFileIndex();
    if (selectedIndex < pdfFiles.length - 1 && selectedIndex !== -1) {
        [pdfFiles[selectedIndex + 1], pdfFiles[selectedIndex]] = [pdfFiles[selectedIndex], pdfFiles[selectedIndex + 1]];
        renderFileList();
        setTimeout(() => {
            const newItem = document.querySelector(`.file-item[data-index="${selectedIndex + 1}"]`);
            if (newItem) newItem.classList.add('selected');
            updateFileCount();
        }, 50);
    }
}

// Reverse order
function reverseOrder() {
    pdfFiles.reverse();
    renderFileList();
    clearSelection();
}

// Handle file upload
async function handleFiles(files) {
    const pdfFilesArray = Array.from(files).filter(file => file.type === 'application/pdf');
    
    if (pdfFilesArray.length === 0) {
        alert('Please select valid PDF files.');
        return;
    }
    
    if (pdfFiles.length + pdfFilesArray.length > 20) {
        alert('Maximum 20 files allowed. Please remove some files first.');
        return;
    }
    
    // Check file sizes
    for (const file of pdfFilesArray) {
        if (file.size > 50 * 1024 * 1024) {
            alert(`File "${file.name}" exceeds 50MB limit.`);
            return;
        }
    }
    
    // Show loading indicator on files
    mergeBtn.disabled = true;
    
    for (const file of pdfFilesArray) {
        // Read file as array buffer and try to get page count
        const arrayBuffer = await file.arrayBuffer();
        
        // Try to get page count using pdf-lib
        let pageCount = 0;
        try {
            const pdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
            pageCount = pdfDoc.getPageCount();
        } catch (e) {
            console.warn('Could not read page count:', e);
            pageCount = '?';
        }
        
        pdfFiles.push({
            file: file,
            name: file.name,
            size: file.size,
            pages: pageCount,
            arrayBuffer: arrayBuffer
        });
    }
    
    renderFileList();
    mergeBtn.disabled = pdfFiles.length < 2;
    resultsSection.style.display = 'none';
    mergedPdfBlob = null;
}

// Merge PDFs
async function mergePDFs() {
    if (pdfFiles.length < 2) {
        alert('Please add at least 2 PDF files to merge.');
        return;
    }
    
    mergeBtn.disabled = true;
    mergeBtn.innerHTML = '<div class="loading-spinner"></div> Merging PDFs...';
    progressContainer.style.display = 'block';
    mergeProgress.style.width = '0%';
    progressText.textContent = 'Loading PDF files...';
    resultsSection.style.display = 'none';
    
    try {
        // Create a new PDF document
        const mergedPdf = await PDFLib.PDFDocument.create();
        let totalPagesMerged = 0;
        
        for (let i = 0; i < pdfFiles.length; i++) {
            const fileData = pdfFiles[i];
            const progress = ((i / pdfFiles.length) * 100).toFixed(1);
            mergeProgress.style.width = `${progress}%`;
            progressText.textContent = `Merging ${i + 1}/${pdfFiles.length}: ${fileData.name}...`;
            
            // Load the PDF
            let pdfDoc;
            try {
                pdfDoc = await PDFLib.PDFDocument.load(fileData.arrayBuffer);
            } catch (e) {
                console.error(`Error loading ${fileData.name}:`, e);
                continue;
            }
            
            // Copy pages
            const pageIndices = pdfDoc.getPageIndices();
            const copiedPages = await mergedPdf.copyPages(pdfDoc, pageIndices);
            copiedPages.forEach(page => {
                mergedPdf.addPage(page);
                totalPagesMerged++;
            });
        }
        
        // Add page numbers if requested
        if (addPageNumbers.checked) {
            progressText.textContent = 'Adding page numbers...';
            const pages = mergedPdf.getPages();
            for (let i = 0; i < pages.length; i++) {
                const page = pages[i];
                const { width, height } = page.getSize();
                page.drawText(`${i + 1}`, {
                    x: width / 2 - 10,
                    y: 30,
                    size: 12,
                    color: PDFLib.rgb(0.3, 0.3, 0.3)
                });
            }
        }
        
        // Compress if requested (pdf-lib does some compression by default)
        progressText.textContent = 'Generating final PDF...';
        mergeProgress.style.width = '90%';
        
        let pdfBytes;
        if (compressOutput.checked) {
            // Save with compression (pdf-lib does compression by default)
            pdfBytes = await mergedPdf.save();
        } else {
            pdfBytes = await mergedPdf.save();
        }
        
        mergedPdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
        
        // Display results
        mergeProgress.style.width = '100%';
        progressText.textContent = 'Merge complete!';
        
        mergedCountSpan.textContent = pdfFiles.length;
        outputSizeSpan.textContent = formatFileSize(mergedPdfBlob.size);
        totalPagesSpan.textContent = totalPagesMerged;
        
        resultsSection.style.display = 'block';
        
        // Auto scroll to results
        resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
    } catch (error) {
        console.error('Merge error:', error);
        alert('Error merging PDFs. Please make sure the files are valid PDFs and try again.');
    } finally {
        mergeBtn.disabled = false;
        mergeBtn.innerHTML = '🔗 Merge PDF Files';
        setTimeout(() => {
            progressContainer.style.display = 'none';
            mergeProgress.style.width = '0%';
        }, 1500);
    }
}

// Download merged PDF
function downloadMergedPDF() {
    if (!mergedPdfBlob) {
        alert('No merged PDF available. Please merge files first.');
        return;
    }
    
    let filename = outputFilename.value.trim();
    if (!filename) filename = 'merged_document';
    if (!filename.endsWith('.pdf')) filename += '.pdf';
    
    const url = URL.createObjectURL(mergedPdfBlob);
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
    if (pdfFiles.length > 0 && !confirm('Reset will remove all files. Continue?')) {
        return;
    }
    pdfFiles = [];
    mergedPdfBlob = null;
    renderFileList();
    resultsSection.style.display = 'none';
    progressContainer.style.display = 'none';
    outputFilename.value = 'merged_document';
    addPageNumbers.checked = false;
    compressOutput.checked = false;
    clearSelection();
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
            handleFiles(files);
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
            handleFiles(e.target.files);
            fileInput.value = '';
        }
    });
}

// Setup event listeners
function setupEventListeners() {
    mergeBtn.addEventListener('click', mergePDFs);
    downloadBtn.addEventListener('click', downloadMergedPDF);
    resetBtn.addEventListener('click', resetAll);
    clearAllBtn.addEventListener('click', clearAllFiles);
    moveUpBtn.addEventListener('click', moveUp);
    moveDownBtn.addEventListener('click', moveDown);
    reverseOrderBtn.addEventListener('click', reverseOrder);
}

// Initialize app
function init() {
    initDOMElements();
    setupDragAndDrop();
    setupEventListeners();
    renderFileList();
}

// Start app when DOM is ready and pdf-lib is loaded
if (typeof PDFLib !== 'undefined') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    window.addEventListener('load', () => {
        if (typeof PDFLib !== 'undefined') {
            init();
        } else {
            console.error('pdf-lib library failed to load');
            alert('Failed to load PDF library. Please check your internet connection and refresh.');
        }
    });
}