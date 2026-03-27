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
  } else if (type === "html") {
    msgDiv.innerHTML = message;
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
  await new Promise((r) => setTimeout(r, 400));

  try {
    const msg = messageStr.toLowerCase();

    // 1. Check for MLT queries by number OR by topic keyword
    const mltKeywords = {
      MLT1: [
        "mlt1",
        "resume writing",
        "first lab",
        "first laboratory",
        "resume writing lab",
      ],
      MLT2: [
        "mlt2",
        "table list",
        "unordered",
        "ordered list",
        "ul and ol",
        "ul ol",
        "second lab",
        "second laboratory",
      ],
      MLT3: [
        "mlt3",
        "request for proposal",
        "rfp",
        "proposal",
        "third lab",
        "third laboratory",
      ],
      MLT4: [
        "mlt4",
        "image map",
        "imagemap",
        "fourth lab",
        "fourth laboratory",
      ],
      MLT5: [
        "mlt5",
        "resume internal",
        "internal css",
        "internal css resume",
        "fifth lab",
        "fifth laboratory",
      ],
      MLT6: [
        "mlt6",
        "display property",
        "display",
        "sixth lab",
        "sixth laboratory",
      ],
      MLT7: [
        "mlt7",
        "semantic css",
        "semantic",
        "seventh lab",
        "seventh laboratory",
      ],
      MLT8: ["mlt8", "css layout", "layout", "eighth lab", "eighth laboratory"],
    };

    let mltId = null;
    for (const [id, keywords] of Object.entries(mltKeywords)) {
      if (keywords.some((kw) => msg.includes(kw))) {
        mltId = id;
        break;
      }
    }

    if (mltId) {
      // Typing animation — only for MLT
      removeTypingIndicator();
      addMessage("Let me check that for you...", "ai");
      showTypingIndicator();
      await new Promise((r) => setTimeout(r, 5000));
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
    let responseType = "text";

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
    } else if (
      msg.includes("picture") ||
      msg.includes("photo") ||
      msg.includes("pic") ||
      msg.includes("face") ||
      msg.includes("look like") ||
      msg.includes("image of")
    ) {
      responseText = `<strong>Here is Charles!</strong><br><img src="images/profile.jpeg" alt="Charles Yumul David" style="width:100%; max-width:200px; border-radius:12px; margin-top:8px; display:block;" />`;
      responseType = "html";
    } else if (
      msg.includes("jm") ||
      msg.includes("nerison") ||
      msg.includes("john michael")
    ) {
      responseText = `<strong>Eto si JM! 😄</strong><br><img src="images/jm.jpg" alt="JM Nerison" style="width:100%; max-width:200px; border-radius:12px; margin-top:8px; display:block;" />`;
      responseType = "html";
    } else if (msg.includes("hello") || msg.includes("hi ") || msg === "hi") {
      responseText =
        "Hello! Ask me about Charles' skills, education, or to fetch raw code for his Midterm (MLT1 to MLT8) projects!";
    } else if (msg.includes("thank")) {
      responseText =
        "You're very welcome! Let me know if you want the code for any of the MLT projects.";
    } else if (msg.includes("facebook") || msg.match(/\bfb\b/)) {
      responseText = `<strong>Connect on Facebook:</strong><br><a href="https://www.facebook.com/chxrlz.d4vd" target="_blank" style="display:inline-block; border: 1px solid #64ffda; padding: 5px 10px; border-radius: 5px; margin-top: 5px; text-decoration:none; color:#64ffda;"><img src="images/facebook.png" style="width:20px; vertical-align:middle; margin-right:5px;"> Facebook Profile</a>`;
      responseType = "html";
    } else if (msg.includes("instagram") || msg.match(/\big\b/)) {
      responseText = `<strong>Connect on Instagram:</strong><br><a href="https://www.instagram.com/chx.d4vd" target="_blank" style="display:inline-block; border: 1px solid #64ffda; padding: 5px 10px; border-radius: 5px; margin-top: 5px; text-decoration:none; color:#64ffda;"><img src="images/instagram.png" style="width:20px; vertical-align:middle; margin-right:5px;"> Instagram Profile</a>`;
      responseType = "html";
    } else if (msg.includes("tiktok")) {
      responseText = `<strong>Connect on TikTok:</strong><br><a href="https://www.tiktok.com/@chxrlzd4vd?lang=en" target="_blank" style="display:inline-block; border: 1px solid #64ffda; padding: 5px 10px; border-radius: 5px; margin-top: 5px; text-decoration:none; color:#64ffda;"><img src="images/tiktok.png" style="width:20px; vertical-align:middle; margin-right:5px;"> TikTok Profile</a>`;
      responseType = "html";
    } else if (msg.includes("telegram") || msg.match(/\btg\b/)) {
      responseText = `<strong>Connect on Telegram:</strong><br><a href="https://t.me/ch777x2" target="_blank" style="display:inline-block; border: 1px solid #64ffda; padding: 5px 10px; border-radius: 5px; margin-top: 5px; text-decoration:none; color:#64ffda;"><img src="images/telegram.png" style="width:20px; vertical-align:middle; margin-right:5px;"> Telegram Profile</a>`;
      responseType = "html";
    } else if (
      msg.includes("social") ||
      msg.includes("connect") ||
      msg.includes("media") ||
      msg.includes("link")
    ) {
      responseText = `<strong style="display:block; margin-bottom:8px;">Charles' Social Media Profiles:</strong>
        <div style="display:flex; gap:15px; align-items:center;">
          <a href="https://www.facebook.com/chxrlz.d4vd" target="_blank" title="Facebook"><img src="images/facebook.png" style="width:30px; border-radius:4px;" alt="Facebook" /></a>
          <a href="https://www.instagram.com/chx.d4vd" target="_blank" title="Instagram"><img src="images/instagram.png" style="width:30px; border-radius:4px;" alt="Instagram" /></a>
          <a href="https://www.tiktok.com/@chxrlzd4vd?lang=en" target="_blank" title="TikTok"><img src="images/tiktok.png" style="width:30px; border-radius:4px;" alt="TikTok" /></a>
          <a href="https://t.me/ch777x2" target="_blank" title="Telegram"><img src="images/telegram.png" style="width:30px; border-radius:4px;" alt="Telegram" /></a>
        </div>`;
      responseType = "html";
    } else if (
      msg.includes("music") ||
      msg.includes("song") ||
      msg.includes("spotify") ||
      msg.includes("playlist")
    ) {
      // Charles' personal Spotify playlist
      responseText = `<strong style="display:block; margin-bottom:8px;">Here is some music for you! 🎵</strong>
        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/4zR7BFd7KUDm2UpHunWw5k?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>`;
      responseType = "html";
    }

    removeTypingIndicator();
    addMessage(responseText, "ai", responseType);
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
