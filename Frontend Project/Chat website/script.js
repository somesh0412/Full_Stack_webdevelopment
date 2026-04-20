const chatForm = document.getElementById('chat-form');
const msgInput = document.getElementById('msg-input');
const msgArea = document.getElementById('message-area');

let messages = JSON.parse(localStorage.getItem('chat_history')) || [];

function renderMessages() {
    msgArea.innerHTML = '';
    messages.forEach(msg => {
        const div = document.createElement('div');
        div.className = `message ${msg.sender}`;
        div.innerText = msg.text;
        msgArea.appendChild(div);
    });
    msgArea.scrollTop = msgArea.scrollHeight; // Auto-scroll to bottom
}

chatForm.onsubmit = (e) => {
    e.preventDefault();
    const text = msgInput.value.trim();
    if (!text) return;

    // Add message to array
    const newMessage = { sender: 'me', text: text };
    messages.push(newMessage);
    
    // Save and Re-render
    localStorage.setItem('chat_history', JSON.stringify(messages));
    msgInput.value = '';
    renderMessages();
};

// Initial Load
renderMessages();