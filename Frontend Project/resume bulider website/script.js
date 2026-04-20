function updatePreview() {
    // Personal Info
    document.getElementById('out-name').innerText = document.getElementById('in-name').value || "Your Name";
    document.getElementById('out-role').innerText = document.getElementById('in-role').value || "Professional Title";
    document.getElementById('out-email').innerText = document.getElementById('in-email').value || "email@example.com";
    document.getElementById('out-phone').innerText = document.getElementById('in-phone').value || "123-456-7890";

    // Summary
    const summary = document.getElementById('in-sum').value;
    document.getElementById('out-sum').innerText = summary || "A brief overview of your professional background...";

    // Experience
    const experience = document.getElementById('in-exp').value;
    document.getElementById('out-exp').innerText = experience || "List your previous roles here.";

    // Skills
    const skills = document.getElementById('in-skills').value;
    document.getElementById('out-skills').innerText = skills || "Skills will appear here...";
}

// Save data to LocalStorage so it persists on refresh
window.onload = () => {
    // You could add logic here to load saved values
};