const themeToggle = document.getElementById("theme-toggle");
const body = document.body;
const profileImg = document.getElementById("profile-img");

const updateProfileImage = (theme) => {
  if (profileImg) {

    profileImg.classList.add("fade-out");


    setTimeout(() => {
      profileImg.src =
        theme === "dark"
          ? "assets/images/animatedprof.png"
          : "assets/images/profile.jpeg";


      setTimeout(() => {
        profileImg.classList.remove("fade-out");
      }, 50);
    }, 300);
  }
};


const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "light") {
  body.classList.add("light");
  updateProfileImage("light");
} else {
  body.classList.remove("light");
  updateProfileImage("dark");
}

themeToggle.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    localStorage.setItem("theme", "dark");
    updateProfileImage("dark");
  } else {
    body.classList.add("light");
    localStorage.setItem("theme", "light");
    updateProfileImage("light");
  }
});


const chatbotToggle = document.getElementById("chatbot-toggle");
const chatbotContainer = document.getElementById("chatbot-container");
const chatbotClose = document.getElementById("chatbot-close");
const chatbotInput = document.getElementById("chatbot-input");
const chatbotSend = document.getElementById("chatbot-send");
const chatbotMessages = document.getElementById("chatbot-messages");

let isChatOpen = false;

let chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];

const saveHistory = () => {
  localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
};

window.addEventListener("DOMContentLoaded", () => {
  if (chatHistory.length > 0) {
    chatbotMessages.innerHTML = "";
    chatHistory.forEach((msg) => {
      addMessage(msg.message, msg.sender, msg.type, false);
    });
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }
});


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

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isChatOpen) {
    chatbotClose.click();
  }
});

const suggestionChips = document.querySelectorAll(".suggestion-chip");
suggestionChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    chatbotInput.value = chip.textContent;
    sendMessage();
  });
});


const formatRawCode = (code) => {
  return `<pre class="raw-code"><code>${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</code></pre>`;
};


const addMessage = (message, sender, type = "text", save = true) => {
  if (save) {
    chatHistory.push({ message, sender, type });
    saveHistory();
  }

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


const showTypingIndicator = () => {
  const typingDiv = document.createElement("div");
  typingDiv.classList.add("chat-message", "ai-message", "typing-indicator");
  typingDiv.id = "typing-indicator";
  typingDiv.innerHTML = "<span>.</span><span>.</span><span>.</span>";
  chatbotMessages.appendChild(typingDiv);
  chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
};


const removeTypingIndicator = () => {
  const typingDiv = document.getElementById("typing-indicator");
  if (typingDiv) {
    typingDiv.remove();
  }
};

const sendMessage = async () => {
  const messageStr = chatbotInput.value.trim();
  if (!messageStr) return;


  addMessage(messageStr, "user");
  chatbotInput.value = "";


  showTypingIndicator();
  await new Promise((r) => setTimeout(r, 400));

  try {
    const msg = messageStr.toLowerCase();



    const projectsData = {
      midterms: [
        { id: "MLT1", title: "Resume Writing", folder: "resume-writing" },
        { id: "MLT2", title: "Table List", folder: "table-list" },
        { id: "MLT3", title: "Request for Proposal", folder: "rfp-proposal" },
        { id: "MLT4", title: "Image Map", folder: "image-map" },
        { id: "MLT5", title: "Resume (Internal CSS)", folder: "resume-internal" },
        { id: "MLT6", title: "Display Property", folder: "display-property" },
        { id: "MLT7", title: "Semantic CSS", folder: "semantic-html" },
        { id: "MLT8", title: "CSS Layout", folder: "css-layout" },
      ],
      finals: [
        { id: "POS", title: "CSS Positioning", folder: "css-positioning", path: "finals" },
        { id: "FLEX", title: "CSS Flexbox", folder: "css-flexbox", path: "finals", file: "flexbox.html" },
        { id: "GRID", title: "Bootstrap Grid", folder: "boostrap-grid", path: "finals" },
        { id: "PONDO", title: "Pondo Application", link: "https://pondoph.vercel.app" },
        { id: "VIDEO", title: "Pondo Video", link: "assets/images/SuperMenss.mp4" },
        { id: "DATA", title: "Portfolio Data Files", link: "assets/images/structure.png" },
      ]
    };


    let targetProjectId = null;
    if (msg.startsWith("source ")) {
      targetProjectId = msg.replace("source ", "").trim().toUpperCase();
    } else {

      const allProjects = [...projectsData.midterms, ...projectsData.finals];
      for (const p of allProjects) {
        if (msg === p.id.toLowerCase() || msg === p.title.toLowerCase()) {
          targetProjectId = p.id;
          break;
        }
      }
    }

    if (targetProjectId) {
      const project = [...projectsData.midterms, ...projectsData.finals].find(p => p.id === targetProjectId);

      if (project && project.folder) {
        removeTypingIndicator();
        addMessage(`Fetching source code for ${project.title}...`, "ai");
        showTypingIndicator();
        await new Promise((r) => setTimeout(r, 1500));

        let projectCode = null;
        try {
          const basePath = project.path || "midterms";
          const fileName = project.file || "index.html";
          const htmlRes = await fetch(`${basePath}/${project.folder}/${fileName}`);

          if (htmlRes.ok) {
            const htmlText = await htmlRes.text();
            projectCode = `<!-- ${project.title} ${fileName} -->\n` + htmlText;


            const cssRes = await fetch(`${basePath}/${project.folder}/style.css`);
            if (cssRes.ok) {
              const cssText = await cssRes.text();
              projectCode += `\n\n/* style.css */\n` + cssText;
            } else {

              const mainCssRes = await fetch(`${basePath}/${project.folder}/main.css`);
              if (mainCssRes.ok) {
                const mainCssText = await mainCssRes.text();
                projectCode += `\n\n/* main.css */\n` + mainCssText;
              }
            }
          }
        } catch (e) {
          console.error("Failed to fetch source", e);
        }

        removeTypingIndicator();
        if (projectCode) {
          addMessage(projectCode, "ai", "raw");
        } else {
          addMessage(`Sorry, I couldn't retrieve the source code for ${project.title}.`, "ai");
        }
        return;
      }
    }



    let responseText = "I'm not sure about that. Try asking about Charles' skills, projects, or education! You can also ask for 'MLT1' to 'MLT8' to see his source code.";
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
      responseText = `<strong>Contact Charles:</strong><br>
        **Email**: <a href="mailto:chrlsdvd0777@gmail.com" style="color: var(--accent); text-decoration:none;">chrlsdvd0777@gmail.com</a><br>
        **Phone**: <a href="tel:+639770487261" style="color: var(--accent); text-decoration:none;">+63 977 048 7261</a><br>
        **Location**: Concepcion, Tarlac, Philippines`;
      responseType = "html";
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
    } else if (msg.includes("who") || msg.includes("with")) {
      responseText = "with Ashley Reyes.";
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
      responseText = `<strong>Here is Charles!</strong><br><img src="assets/images/profile.jpeg" alt="Charles Yumul David" style="width:100%; max-width:200px; border-radius:12px; margin-top:8px; display:block;" />`;
      responseType = "html";
    } else if (
      msg.includes("jm") ||
      msg.includes("nerison") ||
      msg.includes("john michael")
    ) {
      responseText = `<strong>Eto si JM! 😄</strong><br><div style="width:100px; height:100px; background:var(--card-bg-hover); border-radius:12px; display:flex; align-items:center; justify-content:center; margin-top:8px;">👨‍💻</div>`;
      responseType = "html";
    } else if (msg.includes("hello") || msg.includes("hi ") || msg === "hi") {
      responseText =
        "Hello! I can help you explore Charles' skills, education, or projects. Type **'projects'** to see his Midterm and Final work with source code access!";
    } else if (msg.includes("thank")) {
      responseText =
        "You're very welcome! Let me know if you want the code for any of the MLT projects.";
    } else if (msg.includes("facebook") || msg.match(/\bfb\b/)) {
      responseText = `<strong>Connect on Facebook:</strong><br><a href="https://www.facebook.com/chxrlz.d4vd" target="_blank" style="display:inline-flex; align-items:center; gap:8px; border: 1px solid var(--accent); padding: 8px 12px; border-radius: 8px; margin-top: 8px; text-decoration:none; color:var(--accent);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> Facebook Profile</a>`;
      responseType = "html";
    } else if (msg.includes("instagram") || msg.match(/\big\b/)) {
      responseText = `<strong>Connect on Instagram:</strong><br><a href="https://www.instagram.com/chx.d4vd" target="_blank" style="display:inline-flex; align-items:center; gap:8px; border: 1px solid var(--accent); padding: 8px 12px; border-radius: 8px; margin-top: 8px; text-decoration:none; color:var(--accent);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> Instagram Profile</a>`;
      responseType = "html";
    } else if (msg.includes("tiktok")) {
      responseText = `<strong>Connect on TikTok:</strong><br><a href="https://www.tiktok.com/@chxrlzd4vd?lang=en" target="_blank" style="display:inline-flex; align-items:center; gap:8px; border: 1px solid var(--accent); padding: 8px 12px; border-radius: 8px; margin-top: 8px; text-decoration:none; color:var(--accent);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg> TikTok Profile</a>`;
      responseType = "html";
    } else if (msg.includes("telegram") || msg.match(/\btg\b/)) {
      responseText = `<strong>Connect on Telegram:</strong><br><a href="https://t.me/ch777x2" target="_blank" style="display:inline-flex; align-items:center; gap:8px; border: 1px solid var(--accent); padding: 8px 12px; border-radius: 8px; margin-top: 8px; text-decoration:none; color:var(--accent);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg> Telegram Profile</a>`;
      responseType = "html";
    } else if (msg.includes("github") || msg.includes("repo") || msg.includes("source")) {
      responseText = `<strong>Check out my GitHub:</strong><br><a href="https://github.com/chrlsd4vd" target="_blank" style="display:inline-flex; align-items:center; gap:8px; border: 1px solid var(--accent); padding: 8px 12px; border-radius: 8px; margin-top: 8px; text-decoration:none; color:var(--accent);"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg> GitHub Profile</a>`;
      responseType = "html";
    } else if (
      msg.includes("social") ||
      msg.includes("connect") ||
      msg.includes("media") ||
      msg.includes("link")
    ) {
      responseText = `<strong style="display:block; margin-bottom:8px;">Charles' Social Media Profiles:</strong>
        <div style="display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
          <a href="https://www.facebook.com/chxrlz.d4vd" target="_blank" title="Facebook" style="color:var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="https://www.instagram.com/chx.d4vd" target="_blank" title="Instagram" style="color:var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
          <a href="https://www.tiktok.com/@chxrlzd4vd?lang=en" target="_blank" title="TikTok" style="color:var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg></a>
          <a href="https://t.me/ch777x2" target="_blank" title="Telegram" style="color:var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg></a>
          <a href="https://github.com/chrlsd4vd" target="_blank" title="GitHub" style="color:var(--text-primary);"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg></a>
        </div>`;
      responseType = "html";
    } else if (msg.includes("project") || msg.includes("work") || msg.includes("final") || msg.includes("midterm")) {
      let projectsHtml = `<strong style="font-size: 1.1rem;">Charles' Academic Projects</strong><br><br>`;

      projectsHtml += `<div style="margin-bottom: 12px;"><strong>Midterms (Lab Tasks)</strong><ul style="list-style: none; padding: 0; margin-top: 5px;">`;
      projectsData.midterms.forEach(p => {
        projectsHtml += `<li style="margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span style="flex: 1;">${p.title}</span>
          <a href="midterms/${p.folder}/index.html" target="_blank" style="font-size: 0.75rem; color: var(--accent); border: 1px solid var(--accent); padding: 2px 6px; border-radius: 4px; text-decoration: none;">View</a>
          <a href="javascript:void(0)" onclick="document.getElementById('chatbot-input').value='source ${p.id}'; document.getElementById('chatbot-send').click();" style="font-size: 0.75rem; color: #fff; background: var(--accent); padding: 2px 6px; border-radius: 4px; text-decoration: none;">Source</a>
        </li>`;
      });
      projectsHtml += `</ul></div>`;

      projectsHtml += `<div><strong>Finals (Projects)</strong><ul style="list-style: none; padding: 0; margin-top: 5px;">`;
      projectsData.finals.forEach(p => {
        const viewLink = p.link || `${p.path}/${p.folder}/${p.file || 'index.html'}`;
        projectsHtml += `<li style="margin-bottom: 6px; display: flex; align-items: center; gap: 8px;">
          <span style="flex: 1;">${p.title}</span>
          <a href="${viewLink}" target="_blank" style="font-size: 0.75rem; color: var(--accent); border: 1px solid var(--accent); padding: 2px 6px; border-radius: 4px; text-decoration: none;">View</a>`;
        if (p.folder) {
          projectsHtml += `<a href="javascript:void(0)" onclick="document.getElementById('chatbot-input').value='source ${p.id}'; document.getElementById('chatbot-send').click();" style="font-size: 0.75rem; color: #fff; background: var(--accent); padding: 2px 6px; border-radius: 4px; text-decoration: none;">Source</a>`;
        }
        projectsHtml += `</li>`;
      });
      projectsHtml += `</ul></div>`;

      responseText = projectsHtml;
      responseType = "html";
    } else if (msg.includes("structure") || msg.includes("data") || msg.includes("file")) {
      responseText = `<strong>Portfolio Data Structure:</strong><br>
        <a href="assets/images/structure.png" target="_blank"><img src="assets/images/structure.png" style="width:100%; border-radius:8px; margin-top:8px;" /></a>`;
      responseType = "html";
    } else if (
      msg.includes("music") ||
      msg.includes("song") ||
      msg.includes("spotify") ||
      msg.includes("playlist")
    ) {

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





(function () {
  const panel = document.getElementById("view-counter-panel");
  const countEl = document.getElementById("view-count");
  const closeBtn = document.getElementById("view-counter-close");
  const nameElement = document.querySelector(".name");

  let isVisible = false;
  let autoHideTimer = null;
  let totalViews = null;
  let tapCount = 0;
  let lastTapTime = 0;


  const animateCount = (target) => {
    const duration = 1200;
    const start = performance.now();
    const from = 0;

    const tick = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4);
      const current = Math.round(from + (target - from) * ease);
      countEl.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        countEl.textContent = target.toLocaleString();
      }
    };
    requestAnimationFrame(tick);
  };


  const showPanel = () => {
    if (isVisible) return;
    isVisible = true;
    panel.classList.add("view-counter-visible");
    panel.setAttribute("aria-hidden", "false");
    if (totalViews !== null) animateCount(totalViews);

    clearTimeout(autoHideTimer);
    autoHideTimer = setTimeout(hidePanel, 8000);
  };


  const hidePanel = () => {
    isVisible = false;
    panel.classList.remove("view-counter-visible");
    panel.setAttribute("aria-hidden", "true");
    clearTimeout(autoHideTimer);
  };


  document.addEventListener("keydown", (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "V") {
      e.preventDefault();
      isVisible ? hidePanel() : showPanel();
    }
  });


  if (nameElement) {
    nameElement.style.cursor = "pointer";
    nameElement.addEventListener("click", () => {
      const currentTime = new Date().getTime();
      const tapLength = currentTime - lastTapTime;

      if (tapLength < 500 && tapLength > 0) {
        tapCount++;
      } else {
        tapCount = 1;
      }

      lastTapTime = currentTime;

      if (tapCount === 3) {
        isVisible ? hidePanel() : showPanel();
        tapCount = 0;
      }
    });
  }


  if (closeBtn) {
    closeBtn.addEventListener("click", hidePanel);
  }


  const handleViews = async () => {

    const isLocal =
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1";

    try {

      const namespace = "chrlsd4vd";
      const key = "wansiportfolio";

      let url = `https://api.counterapi.dev/v1/${namespace}/${key}`;


      if (!isLocal) {
        url += "/up";
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      totalViews = data.count;
    } catch (err) {
      console.warn("View counter API failed, using local estimate.");
      const stored = parseInt(localStorage.getItem("_pv_local") || "0", 10);
      if (!isLocal) {
        localStorage.setItem("_pv_local", stored + 1);
      }
      totalViews = stored + (isLocal ? 0 : 1);
    }
  };

  handleViews();
})();

// Video Modal Logic
const videoTrigger = document.getElementById("video-trigger");
const videoModal = document.getElementById("video-modal");
const videoModalClose = document.getElementById("video-modal-close");
const pondoVideo = document.getElementById("pondo-video");

if (videoTrigger && videoModal && videoModalClose && pondoVideo) {
  videoTrigger.addEventListener("click", (e) => {
    e.preventDefault();
    videoModal.classList.remove("video-modal-hidden");
    pondoVideo.play();
  });

  const closeVideoModal = () => {
    videoModal.classList.add("video-modal-hidden");
    pondoVideo.pause();
    pondoVideo.currentTime = 0;
  };

  videoModalClose.addEventListener("click", closeVideoModal);

  // Close on background click
  videoModal.addEventListener("click", (e) => {
    if (e.target.classList.contains("video-modal-overlay")) {
      closeVideoModal();
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", (e) => {
    if (
      e.key === "Escape" &&
      !videoModal.classList.contains("video-modal-hidden")
    ) {
      closeVideoModal();
    }
  });
}

