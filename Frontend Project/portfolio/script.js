// Typing Effect
const text = ["Web Developer", "Programmer", "Student"];
let index = 0;
let charIndex = 0;

function typeEffect() {
    if (charIndex < text[index].length) {
        document.getElementById("typing").innerHTML += text[index].charAt(charIndex);
        charIndex++;
        setTimeout(typeEffect, 100);
    } else {
        setTimeout(eraseEffect, 1000);
    }
}

function eraseEffect() {
    if (charIndex > 0) {
        document.getElementById("typing").innerHTML = text[index].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseEffect, 50);
    } else {
        index = (index + 1) % text.length;
        setTimeout(typeEffect, 200);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeEffect();
});

// Contact Form
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    document.getElementById("formMessage").innerText = "Message sent successfully!";
});