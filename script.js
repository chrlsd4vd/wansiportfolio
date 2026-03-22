const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
  body.classList.add("light");
} else {
  body.classList.remove("light");
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    localStorage.setItem("theme", "dark");
  } else {
    body.classList.add("light");
    localStorage.setItem("theme", "light");
  }
});

// Chatbot Logic
const chatbotToggle = document.getElementById('chatbot-toggle');
const chatbotContainer = document.getElementById('chatbot-container');
const chatbotClose = document.getElementById('chatbot-close');
const chatbotInput = document.getElementById('chatbot-input');
const chatbotSend = document.getElementById('chatbot-send');
const chatbotMessages = document.getElementById('chatbot-messages');

let isChatOpen = false;

// Toggle chat window
chatbotToggle.addEventListener('click', () => {
    isChatOpen = !isChatOpen;
    if (isChatOpen) {
        chatbotContainer.classList.remove('chatbot-hidden');
        chatbotToggle.style.transform = 'scale(0.8)';
        chatbotInput.focus();
    } else {
        chatbotContainer.classList.add('chatbot-hidden');
        chatbotToggle.style.transform = 'scale(1)';
    }
});

chatbotClose.addEventListener('click', () => {
    isChatOpen = false;
    chatbotContainer.classList.add('chatbot-hidden');
    chatbotToggle.style.transform = 'scale(1)';
});

// Format Raw Code block
const formatRawCode = (code) => {
    return `<pre class="raw-code"><code>${code.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</code></pre>`;
};

// Add Message to Chat
const addMessage = (message, sender, type = 'text') => {
    const msgDiv = document.createElement('div');
    msgDiv.classList.add('chat-message');
    msgDiv.classList.add(sender === 'user' ? 'user-message' : 'ai-message');
    
    if (type === 'raw') {
        msgDiv.innerHTML = formatRawCode(message);
    } else {
        msgDiv.textContent = message;
    }
    
    chatbotMessages.appendChild(msgDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Show typing indicator
const showTypingIndicator = () => {
    const typingDiv = document.createElement('div');
    typingDiv.classList.add('chat-message', 'ai-message', 'typing-indicator');
    typingDiv.id = 'typing-indicator';
    typingDiv.innerHTML = '<span>.</span><span>.</span><span>.</span>';
    chatbotMessages.appendChild(typingDiv);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Remove typing indicator
const removeTypingIndicator = () => {
    const typingDiv = document.getElementById('typing-indicator');
    if (typingDiv) {
        typingDiv.remove();
    }
};

// Send message to backend
const sendMessage = async () => {
    const message = chatbotInput.value.trim();
    if (!message) return;

    // Display user message
    addMessage(message, 'user');
    chatbotInput.value = '';

    // Show loading
    showTypingIndicator();

    try {
        // Automatically use http://localhost:5000 if running through VS Code Live Server or file://
        const isLocalDevelopment = window.location.hostname === '127.0.0.1' || window.location.protocol === 'file:';
        const backendUrl = isLocalDevelopment ? 'http://localhost:5000/api/chat' : '/api/chat';

        const response = await fetch(backendUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message })
        });
        
        const data = await response.json();
        removeTypingIndicator();

        if (data.error) {
            addMessage('Error: ' + data.error, 'ai');
        } else {
            addMessage(data.text, 'ai', data.type);
        }
    } catch (error) {
        removeTypingIndicator();
        addMessage('Sorry, I cannot connect to the server right now.', 'ai');
        console.error('Chat Error:', error);
    }
};

chatbotSend.addEventListener('click', sendMessage);
chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});
