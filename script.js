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
const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");

let isChatOpen = false;

// Toggle chat window
chatbotToggle.addEventListener("click", () => {
  isChatOpen = !isChatOpen;
  if (isChatOpen) {
    chatbotContainer.classList.remove("chatbot-hidden");
    chatbotToggle.style.transform = "scale(0.8)";
    chatbotInput.focus();
  } else {
    chatbotContainer.classList.add("chatbot-hidden");
    chatbotToggle.style.transform = "scale(1)";
  }
});

chatbotClose.addEventListener("click", () => {
  isChatOpen = false;
  chatbotContainer.classList.add("chatbot-hidden");
  chatbotToggle.style.transform = "scale(1)";
});

// Format Raw Code block
const formatRawCode = (code) => {
  return `<pre class="raw-code"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
};

// Add Message to Chat
const addMessage = (message, sender, type = "text") => {
  const msgDiv = document.createElement("div");
  msgDiv.classList.add("chat-message");
  msgDiv.classList.add(sender === "user" ? "user-message" : "ai-message");

  if (type === "raw") {
    msgDiv.innerHTML = formatRawCode(message);
  } else {
    msgDiv.textContent = message;
  }

  chatbotMessages.appendChild(msgDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Show typing indicator
const showTypingIndicator = () => {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("chat-message", "ai-message", "typing-indicator");
  typingDiv.id = "typing-indicator";
  typingDiv.innerHTML = "<span>.</span><span>.</span><span>.</span>";
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};

// Remove typing indicator
const removeTypingIndicator = () => {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) {
    typingDiv.remove();
  }
};

const sendMessage = async () => {
  const messageStr = chatbotInput.value.trim();
  if (!messageStr) return;

  // Display user message
  addMessage(messageStr, "user");
  chatbotInput.value = "";

  // Show loading
  showTypingIndicator();

  // Simulate thinking time so it feels real
  await new Promise((r) => setTimeout(r, 600));

  try {
    const msg = messageStr.toLowerCase();

    // 1. Check for MLT exact queries (e.g., "Give me the code for MLT1")
    const mltMatch = msg.match(/mlt[1-8]/i);
    if (mltMatch) {
      const mltId = mltMatch[0].toUpperCase();
      let mltCode = null;

      try {
        // Fetch from the local folder relativity (Works on Github Pages)
        const htmlRes = await fetch(`WSMIDTERMS/${mltId}/index.html`);
        if (htmlRes.ok) {
          const htmlText = await htmlRes.text();
          mltCode = `<!-- ${mltId} index.html -->\n` + htmlText;

          const cssRes = await fetch(`WSMIDTERMS/${mltId}/style.css`);
          if (cssRes.ok) {
            const cssText = await cssRes.text();
            mltCode += `\n\n/* ${mltId} style.css */\n` + cssText;
          }

          const jsRes = await fetch(`WSMIDTERMS/${mltId}/script.js`);
          if (jsRes.ok) {
            const jsText = await jsRes.text();
            mltCode += `\n\n/* ${mltId} script.js */\n` + jsText;
          }
        }
      } catch (e) {
        console.error("Failed to fetch local files", e);
      }

      if (mltCode) {
        removeTypingIndicator();
        addMessage(mltCode, "ai", "raw");
        return;
      } else {
        removeTypingIndicator();
        addMessage(
          `Sorry, I couldn't find the source code for ${mltId}.`,
          "ai",
        );
        return;
      }
    }

    // 2. Predefined Rule-Based Responses
    let responseText = "Failed to ask. Ask more question!";

    if (msg.includes("name") || msg.includes("who are you")) {
      responseText = "I'm Charles Yumul David's personal portfolio assistant!";
    } else if (msg.includes("skill") || msg.includes("can do")) {
      responseText =
        "Charles' core skills include:\n- Graphic Design\n- Digital Art\n- Problem Solving\n- Time Management\n\nTech stack: Python, Java, HTML, Canva, Photoshop, Affinity.";
    } else if (
      msg.includes("education") ||
      msg.includes("school") ||
      msg.includes("student")
    ) {
      responseText =
        "Charles is currently a 19-year-old BS Information Technology student. He completed his Senior High School at Benigno S. Aquino National High School under the HUMSS strand.";
    } else if (msg.includes("bio") || msg.includes("about")) {
      responseText =
        "This Enterprise Data Management Portfolio showcases Charles' EDM lab activities and his growing skills in managing and organizing data. He has a strong interest in graphic design and digital creativity.";
    } else if (
      msg.includes("contact") ||
      msg.includes("email") ||
      msg.includes("phone") ||
      msg.includes("hire")
    ) {
      responseText =
        "**Email**: chrlsdvd0777@gmail.com\n**Phone**: +63 977 048 7261\n**Location**: Concepcion, Tarlac, Philippines";
    } else if (
      msg.includes("hobby") ||
      msg.includes("hobbies") ||
      msg.includes("interests")
    ) {
      responseText = "Charles enjoys Gaming, Designing, Music, and Movies!";
    } else if (
      msg.includes("belief") ||
      msg.includes("motto") ||
      msg.includes("quote")
    ) {
      responseText =
        "Consistency and patience lead to quality output. Small improvements create long-term growth. Good effort always pays off.";
    } else if (msg.includes("section")) {
      responseText = "Charles is in section BSIT 1C.";
    } else if (
      msg.includes("status") ||
      msg.includes("single") ||
      msg.includes("relationship")
    ) {
      responseText = "Charles is currently taken.";
    } else if (
      msg.includes("birthdate") ||
      msg.includes("birthday") ||
      msg.includes("born")
    ) {
      responseText = "Charles was born on January 7, 2007.";
    } else if (msg.includes("age") || msg.includes("how old")) {
      responseText = "Charles is 19 years old.";
    } else if (msg.includes("hello") || msg.includes("hi ") || msg === "hi") {
      responseText =
        "Hello! Ask me about Charles' skills, education, or to fetch raw code for his Midterm (MLT1 to MLT8) projects!";
    } else if (msg.includes("thank")) {
      responseText =
        "You're very welcome! Let me know if you want the code for any of the MLT projects.";
    }

    removeTypingIndicator();
    addMessage(responseText, "ai");
  } catch (error) {
    removeTypingIndicator();
    addMessage("Sorry, an error occurred in the chat logic.", "ai");
    console.error("Chat Error:", error);
  }
};

chatbotSend.addEventListener("click", sendMessage);
chatbotInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});
