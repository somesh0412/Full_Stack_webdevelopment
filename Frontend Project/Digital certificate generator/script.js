const canvas = document.getElementById('certificate-canvas');
const ctx = canvas.getContext('2d');

// Set Canvas Resolution (A4 landscape ratio)
canvas.width = 1600;
canvas.height = 1131;

const templateImg = new Image();
// You can replace this with your own certificate background URL
templateImg.src = 'https://img.freepik.com/free-vector/elegant-certificate-template-vector-with-gold-border-business_53876-119159.jpg';

templateImg.onload = function() {
    generateCertificate(); // Initial draw
};

function generateCertificate() {
    const name = document.getElementById('student-name').value || "Recipient Name";
    const course = document.getElementById('course-name').value || "Course Title Here";
    const dateInput = document.getElementById('issue-date').value;
    const date = dateInput ? new Date(dateInput).toLocaleDateString() : "January 1, 2026";

    // 1. Clear and Draw Background
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(templateImg, 0, 0, canvas.width, canvas.height);

    // 2. Add "Certificate of Completion"
    ctx.fillStyle = "#1a1a1a";
    ctx.textAlign = "center";
    
    ctx.font = "bold 40px Outfit";
    ctx.fillText("CERTIFICATE OF COMPLETION", canvas.width / 2, 250);

    ctx.font = "30px Outfit";
    ctx.fillText("This is to certify that", canvas.width / 2, 380);

    // 3. Draw Name (Using Cinzel font for formal look)
    ctx.fillStyle = "#af8d1d";
    ctx.font = "bold 90px Cinzel";
    ctx.fillText(name.toUpperCase(), canvas.width / 2, 520);

    // 4. Draw Course Details
    ctx.fillStyle = "#1a1a1a";
    ctx.font = "30px Outfit";
    ctx.fillText("has successfully completed the requirements for", canvas.width / 2, 630);
    
    ctx.font = "bold 50px Outfit";
    ctx.fillText(course, canvas.width / 2, 720);

    // 5. Draw Date and Signature Placeholders
    ctx.font = "25px Outfit";
    ctx.fillText(`Issued on: ${date}`, canvas.width / 2, 850);
    
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2 - 150, 950);
    ctx.lineTo(canvas.width / 2 + 150, 950);
    ctx.stroke();
    
    ctx.font = "italic 20px Outfit";
    ctx.fillText("Authorized Signature", canvas.width / 2, 980);
}

function downloadCertificate() {
    const link = document.createElement('a');
    link.download = 'certificate.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
}