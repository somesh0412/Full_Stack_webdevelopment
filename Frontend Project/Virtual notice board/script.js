// ---------- Data Storage ----------
let notices = [];

// ---------- Helper Functions ----------
function formatDate(dateInput) {
    if (!dateInput) return "No date specified";
    const d = new Date(dateInput);
    if (isNaN(d.getTime())) return "Invalid date";
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
}

function getTodayDate() {
    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
}

function saveToLocalStorage() {
    localStorage.setItem('college_notices', JSON.stringify(notices));
}

function loadNoticesFromStorage() {
    const stored = localStorage.getItem('college_notices');
    if (stored) {
        notices = JSON.parse(stored);
    } else {
        // default demo notices for fresh start
        notices = [
            {
                id: 'n1',
                title: '📢 Fresher’s Welcome 2025',
                description: 'Join us for Fresher’s party on 20th August 2025 at Main Auditorium. Cultural events, DJ night and refreshments.',
                category: 'Event',
                date: '2025-08-20'
            },
            {
                id: 'n2',
                title: '📚 End Semester Exam TimeTable',
                description: 'End semester exams starting from 10th December 2025. Detailed schedule available on student portal.',
                category: 'Exam',
                date: '2025-12-10'
            },
            {
                id: 'n3',
                title: '🏖️ Diwali Break Announcement',
                description: 'College will remain closed from 12th to 18th November 2025 on account of Diwali festivities.',
                category: 'Holiday',
                date: '2025-11-12'
            },
            {
                id: 'n4',
                title: '💻 Guest Lecture on AI & ML',
                description: 'Department of CSE organizing guest lecture by Dr. Ravi Shankar on 5th Sept. Register via google form.',
                category: 'Academic',
                date: '2025-09-05'
            },
            {
                id: 'n5',
                title: '🏆 Hackathon 2K25',
                description: '48-hour national level hackathon. Prize pool ₹1,00,000. Register before 15th October.',
                category: 'Event',
                date: '2025-10-25'
            }
        ];
        saveToLocalStorage();
    }
    renderNotices();
}

function addNotice(title, description, category, date) {
    if (!title.trim() || !description.trim()) {
        alert("❌ Title and Description cannot be empty!");
        return false;
    }
    const newId = Date.now().toString() + '-' + Math.random().toString(36).substr(2, 6);
    const finalDate = date ? date : getTodayDate();
    const newNotice = {
        id: newId,
        title: title.trim(),
        description: description.trim(),
        category: category,
        date: finalDate
    };
    notices.unshift(newNotice);
    saveToLocalStorage();
    renderNotices();
    return true;
}

function deleteNotice(id) {
    notices = notices.filter(notice => notice.id !== id);
    saveToLocalStorage();
    renderNotices();
}

// ----- filtering and search states -----
let currentFilter = "all";
let currentSearchQuery = "";

function getFilteredNotices() {
    let filtered = [...notices];
    if (currentFilter !== "all") {
        filtered = filtered.filter(notice => notice.category === currentFilter);
    }
    if (currentSearchQuery.trim() !== "") {
        const query = currentSearchQuery.trim().toLowerCase();
        filtered = filtered.filter(notice =>
            notice.title.toLowerCase().includes(query) ||
            notice.description.toLowerCase().includes(query)
        );
    }
    return filtered;
}

function escapeHtml(str) {
    return str.replace(/[&<>]/g, function(m) {
        if (m === '&') return '&amp;';
        if (m === '<') return '&lt;';
        if (m === '>') return '&gt;';
        return m;
    });
}

function renderNotices() {
    const container = document.getElementById('noticesList');
    const statsSpan = document.getElementById('noticeStats');
    const filteredNotices = getFilteredNotices();
    const totalVisible = filteredNotices.length;
    const totalAll = notices.length;
    statsSpan.innerText = `${totalVisible} / ${totalAll} notices`;

    if (filteredNotices.length === 0) {
        container.innerHTML = `<div class="empty-msg">📭 No notices match filter/search. 📭<br><span style="font-size:0.8rem;">Add new notice or reset filters</span></div>`;
        return;
    }

    let html = '';
    filteredNotices.forEach(notice => {
        let borderColor = '';
        switch (notice.category) {
            case 'Academic': borderColor = '#3b82f6'; break;
            case 'Event': borderColor = '#f97316'; break;
            case 'Exam': borderColor = '#ef4444'; break;
            case 'Holiday': borderColor = '#10b981'; break;
            default: borderColor = '#2c7da0';
        }
        const displayDate = formatDate(notice.date);
        html += `
            <div class="notice-item" style="border-left-color: ${borderColor};">
                <div class="notice-title">
                    <span>${escapeHtml(notice.title)}</span>
                    <span class="badge-category" style="background:#eef2ff;">${notice.category}</span>
                </div>
                <div class="notice-meta">
                    <span>📅 ${displayDate}</span>
                    <span>🆔 #${notice.id.slice(-6)}</span>
                </div>
                <div class="notice-desc">${escapeHtml(notice.description)}</div>
                <div style="display: flex; justify-content: flex-end; margin-top: 12px;">
                    <button class="delete-btn" data-id="${notice.id}">🗑️ Delete Notice</button>
                </div>
            </div>
        `;
    });
    container.innerHTML = html;

    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const id = btn.getAttribute('data-id');
            if (confirm("⚠️ Remove this notice permanently?")) {
                deleteNotice(id);
            }
        });
    });
}

function setActiveFilterButton(activeFilterValue) {
    document.querySelectorAll('.filter-btn').forEach(btn => {
        const filterVal = btn.getAttribute('data-filter');
        if (filterVal === activeFilterValue) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function initFilterEvents() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const filterValue = btn.getAttribute('data-filter');
            currentFilter = filterValue;
            setActiveFilterButton(currentFilter);
            renderNotices();
        });
    });

    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        currentSearchQuery = e.target.value;
        renderNotices();
    });
}

function initFormHandler() {
    const form = document.getElementById('noticeForm');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const desc = document.getElementById('desc').value;
        const category = document.getElementById('category').value;
        const date = document.getElementById('date').value;

        if (addNotice(title, desc, category, date)) {
            document.getElementById('title').value = '';
            document.getElementById('desc').value = '';
            document.getElementById('date').value = getTodayDate();
            const btnSubmit = form.querySelector('button[type="submit"]');
            const originalText = btnSubmit.innerText;
            btnSubmit.innerText = '✅ Published!';
            setTimeout(() => { btnSubmit.innerText = originalText; }, 1200);
        }
    });
}

function loadSampleNotices() {
    const sampleNotices = [
        {
            title: "🎓 Placement Drive - TCS & Infosys",
            description: "On campus recruitment drive for 2026 batch. Registration closes 30th Nov.",
            category: "Academic",
            date: "2025-11-25"
        },
        {
            title: "🧘‍♂️ Yoga & Wellness Workshop",
            description: "Free yoga session for stress management. Every Friday at Sports Complex.",
            category: "Event",
            date: "2025-09-10"
        },
        {
            title: "📖 Library Extended Hours",
            description: "Library will remain open till 10 PM during exam week from 5th Dec.",
            category: "Academic",
            date: "2025-12-05"
        },
        {
            title: "🏏 Inter-College Cricket Tournament",
            description: "Teams can register before 18th October. Grand prize.",
            category: "Event",
            date: "2025-10-20"
        }
    ];
    let addedCount = 0;
    for (let sample of sampleNotices) {
        const duplicate = notices.some(n => n.title === sample.title && n.description === sample.description);
        if (!duplicate) {
            const newId = Date.now() + '-' + Math.random().toString(36).substr(2, 5) + addedCount;
            notices.unshift({
                id: newId,
                title: sample.title,
                description: sample.description,
                category: sample.category,
                date: sample.date
            });
            addedCount++;
        }
    }
    if (addedCount > 0) {
        saveToLocalStorage();
        renderNotices();
        alert(`✨ Added ${addedCount} new sample notices!`);
    } else {
        alert("📌 Sample notices already exist, no duplicates added.");
    }
}

function init() {
    document.getElementById('date').value = getTodayDate();
    loadNoticesFromStorage();
    initFilterEvents();
    initFormHandler();
    const sampleBtn = document.getElementById('loadSamplesBtn');
    if (sampleBtn) {
        sampleBtn.addEventListener('click', () => {
            loadSampleNotices();
        });
    }
    window.addEventListener('storage', (e) => {
        if (e.key === 'college_notices') {
            loadNoticesFromStorage();
            renderNotices();
        }
    });
}

init();