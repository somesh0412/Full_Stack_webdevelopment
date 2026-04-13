const jobList = document.getElementById('job-list');
const searchInput = document.getElementById('job-search');
const filterBtns = document.querySelectorAll('.filter-btn');
const appliedCountEl = document.getElementById('applied-count');

// Real-world job data for 2026
const jobs = [
    {
        id: 1,
        title: "Full Stack C# Developer",
        company: "TechNova Solutions",
        location: "Remote (India)",
        type: "Remote",
        salary: "₹18,00,000 - ₹25,00,000",
        skills: ["C#", ".NET Core", "React", "SQL"],
        desc: "Build scalable cloud architecture and maintain microservices for our fintech platform."
    },
    {
        id: 2,
        title: "UX/UI Designer (Immersive Media)",
        company: "PixelVision Studios",
        location: "Bengaluru, KA",
        type: "On-site",
        salary: "₹12,00,000 - ₹18,00,000",
        skills: ["Figma", "Unity 3D", "Blender", "Design Systems"],
        desc: "Create immersive 3D environments and VR interfaces for industrial training simulations."
    },
    {
        id: 3,
        title: "Junior Software Engineer",
        company: "Global Logic Systems",
        location: "Pune, MH",
        type: "On-site",
        salary: "₹6,00,000 - ₹9,00,000",
        skills: ["Java", "Spring Boot", "Git", "Problem Solving"],
        desc: "Join our core engineering team to develop enterprise-level supply chain software."
    },
    {
        id: 4,
        title: "Cloud Infrastructure Architect",
        company: "SkyNet Cloud",
        location: "Remote (Global)",
        type: "Remote",
        salary: "$110,000 - $145,000",
        skills: ["Azure", "Docker", "Kubernetes", "Security"],
        desc: "Optimize and secure multi-cloud environments for high-traffic e-commerce clients."
    }
];

let appliedJobs = JSON.parse(localStorage.getItem('appliedJobs')) || [];

function renderJobs(filterType = 'All', searchQuery = '') {
    jobList.innerHTML = '';
    appliedCountEl.innerText = appliedJobs.length;

    const filtered = jobs.filter(job => {
        const matchesType = filterType === 'All' || job.type === filterType;
        const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                              job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                              job.skills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesType && matchesSearch;
    });

    filtered.forEach(job => {
        const isApplied = appliedJobs.includes(job.id);
        const card = document.createElement('div');
        card.className = 'job-card';
        card.innerHTML = `
            <div class="job-main">
                <span class="company-name">${job.company}</span>
                <h3>${job.title}</h3>
                <div class="job-meta">
                    <span>📍 ${job.location}</span>
                    <span>💼 ${job.type}</span>
                    <span>💰 ${job.salary}</span>
                </div>
                <p class="job-details">${job.desc}</p>
                <div class="skills">
                    ${job.skills.map(s => `<span class="skills-tag">${s}</span>`).join('')}
                </div>
            </div>
            <button class="btn-apply ${isApplied ? 'btn-applied' : ''}" 
                    onclick="applyToJob(${job.id})" 
                    ${isApplied ? 'disabled' : ''}>
                ${isApplied ? '✓ Applied' : 'Apply Now'}
            </button>
        `;
        jobList.appendChild(card);
    });
}

window.applyToJob = (id) => {
    if (!appliedJobs.includes(id)) {
        appliedJobs.push(id);
        localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
        renderJobs(document.querySelector('.filter-btn.active').dataset.type, searchInput.value);
    }
};

searchInput.oninput = (e) => renderJobs(document.querySelector('.filter-btn.active').dataset.type, e.target.value);

filterBtns.forEach(btn => {
    btn.onclick = () => {
        document.querySelector('.filter-btn.active').classList.remove('active');
        btn.classList.add('active');
        renderJobs(btn.dataset.type, searchInput.value);
    };
});

renderJobs();