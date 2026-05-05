
/* ===============================
   INITIAL SETUP (DUMMY DATA)
================================ */
if (!localStorage.getItem("users")) {
    const users = [
        { email: "admin@gmail.com", password: "1234", role: "admin", name: "Admin User" },
        { email: "student@gmail.com", password: "1234", role: "student", name: "Student User", roll: "101", class: "10th" }
    ];
    localStorage.setItem("users", JSON.stringify(users));
}

if (!localStorage.getItem("results")) {
    localStorage.setItem("results", JSON.stringify([]));
}


/* ===============================
   HELPER FUNCTIONS
================================ */
function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
}

function getResults() {
    return JSON.parse(localStorage.getItem("results")) || [];
}

function saveResults(data) {
    localStorage.setItem("results", JSON.stringify(data));
}

function setCurrentUser(user) {
    localStorage.setItem("currentUser", JSON.stringify(user));
}

function getCurrentUser() {
    return JSON.parse(localStorage.getItem("currentUser"));
}

function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}

/* ===============================
   LOGIN LOGIC
================================ */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        let valid = true;

        // Validation
        if (!email) {
            document.getElementById("emailError").innerText = "Email required";
            valid = false;
        } else {
            document.getElementById("emailError").innerText = "";
        }

        if (!password) {
            document.getElementById("passwordError").innerText = "Password required";
            valid = false;
        } else {
            document.getElementById("passwordError").innerText = "";
        }

        if (!valid) return;

        const users = getUsers();
        const user = users.find(u => u.email === email && u.password === password && u.role === role);

        if (!user) {
            alert("Invalid credentials");
            return;
        }

        setCurrentUser(user);
        window.location.href = "dashboard.html";
    });
}

/* ===============================
   COMMON UI (NAVBAR + AUTH)
================================ */
const currentUser = getCurrentUser();

if (currentUser) {
    const userName = document.getElementById("userName");
    if (userName) userName.innerText = `Welcome, ${currentUser.name}`;

    const logoutBtn = document.getElementById("logoutBtn");
    if (logoutBtn) logoutBtn.addEventListener("click", logout);

    // Hide admin menu for students
    if (currentUser.role !== "admin") {
        const adminMenu = document.getElementById("adminMenu");
        if (adminMenu) adminMenu.style.display = "none";

        const actionColumn = document.querySelector(".admin-actions");
        if (actionColumn) actionColumn.style.display = "none";
    }
} else {
    if (!window.location.href.includes("index.html")) {
        window.location.href = "index.html";
    }
}


/* ===============================
   DASHBOARD STATS
================================ */
if (window.location.href.includes("dashboard.html")) {
    const results = getResults();

    document.getElementById("totalStudents").innerText = results.length;
    document.getElementById("totalResults").innerText = results.length;

    const passCount = results.filter(r => r.status === "Pass").length;
    const percent = results.length ? ((passCount / results.length) * 100).toFixed(1) : 0;

    document.getElementById("passPercent").innerText = percent + "%";
}


/* ===============================
   RESULTS TABLE + SEARCH
================================ */
const resultBody = document.getElementById("resultBody");

function calculateGrade(percentage) {
    if (percentage >= 90) return "A+";
    if (percentage >= 75) return "A";
    if (percentage >= 60) return "B";
    if (percentage >= 50) return "C";
    return "F";
}

function renderResults(data) {
    if (!resultBody) return;

    resultBody.innerHTML = "";

    data.forEach((r, index) => {
        const total = r.math + r.science + r.english;
        const percent = (total / 300 * 100).toFixed(2);
        const grade = calculateGrade(percent);
        const status = percent >= 40 ? "Pass" : "Fail";

        const row = `
            <tr>
                <td>${r.roll}</td>
                <td>${r.name}</td>
                <td>${r.math}</td>
                <td>${r.science}</td>
                <td>${r.english}</td>
                <td>${total}</td>
                <td>${percent}%</td>
                <td>${grade}</td>
                <td class="${status === 'Pass' ? 'pass' : 'fail'}">${status}</td>
                <td class="admin-actions">
                    <button onclick="editResult(${index})">Edit</button>
                    <button onclick="deleteResult(${index})">Delete</button>
                </td>
            </tr>
        `;
        resultBody.innerHTML += row;
    });
}

// Load results
if (resultBody) {
    const results = getResults();
    renderResults(results);
}

// Search
const searchInput = document.getElementById("searchInput");
if (searchInput) {
    searchInput.addEventListener("input", function () {
        const value = this.value.toLowerCase();
        const results = getResults();

        const filtered = results.filter(r =>
            r.name.toLowerCase().includes(value) ||
            r.roll.toLowerCase().includes(value)
        );

        renderResults(filtered);
    });
}


/* ===============================
   ADD / EDIT RESULT
================================ */
const resultForm = document.getElementById("resultForm");

if (resultForm) {
    resultForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const roll = document.getElementById("roll").value;
        const name = document.getElementById("name").value;
        const math = parseInt(document.getElementById("math").value);
        const science = parseInt(document.getElementById("science").value);
        const english = parseInt(document.getElementById("english").value);

        if ([math, science, english].some(m => m < 0 || m > 100)) {
            alert("Marks must be between 0 and 100");
            return;
        }

        const results = getResults();

        const newResult = { roll, name, math, science, english };

        results.push(newResult);
        saveResults(results);

        alert("Result Added Successfully");
        window.location.href = "results.html";
    });
}


/* ===============================
   DELETE RESULT
================================ */
function deleteResult(index) {
    const results = getResults();
    results.splice(index, 1);
    saveResults(results);
    renderResults(results);
}

/* ===============================
   EDIT RESULT (BASIC)
================================ */
function editResult(index) {
    const results = getResults();
    const r = results[index];

    localStorage.setItem("editIndex", index);
    localStorage.setItem("editData", JSON.stringify(r));

    window.location.href = "add-result.html";
}


/* ===============================
   PROFILE PAGE
================================ */
if (window.location.href.includes("profile.html")) {
    if (currentUser) {
        document.getElementById("profileName").innerText = currentUser.name || "-";
        document.getElementById("profileEmail").innerText = currentUser.email || "-";
        document.getElementById("profileRole").innerText = currentUser.role || "-";
        document.getElementById("profileRoll").innerText = currentUser.roll || "-";
        document.getElementById("profileClass").innerText = currentUser.class || "-";
    }
}
