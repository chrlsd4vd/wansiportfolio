const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const { PortfolioInfo, MLTCode, ChatLog } = require('./models');
const fs = require('fs').promises;
const path = require('path');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Basic sanitization
const sanitizeInput = (str) => {
    if (!str || typeof str !== 'string') return '';
    return str.replace(/[<>]/g, '').trim(); 
};

// POST /api/chat - Main chatbot endpoint
router.post('/chat', async (req, res) => {
    try {
        let { message } = req.body;
        
        message = sanitizeInput(message);
        if (!message) return res.status(400).json({ error: 'Message is required' });

        // 1. Check for MLT exact queries (e.g., "Give me the code for MLT1")
        const mltMatch = message.match(/MLT[1-8]/i);
        if (mltMatch) {
            const mltId = mltMatch[0].toUpperCase();
            let mltCode = null;

            if (global.mongoConnected) {
                const mltData = await MLTCode.findOne({ mltId });
                if (mltData) mltCode = mltData.code;
            } else {
                // FALLBACK: Read from filesystem directly
                try {
                    const htmlPath = path.join(__dirname, '..', 'WSMIDTERMS', mltId, 'index.html');
                    mltCode = `<!-- ${mltId} index.html -->\n` + await fs.readFile(htmlPath, 'utf8');
                    try {
                        const cssPath = path.join(__dirname, '..', 'WSMIDTERMS', mltId, 'style.css');
                        const cssCode = await fs.readFile(cssPath, 'utf8');
                        mltCode += `\n\n/* ${mltId} style.css */\n` + cssCode;
                    } catch (err) {} // ignore if no css
                } catch (e) {
                    console.error('Local fallback failed to read ' + mltId);
                    mltCode = null;
                }
            }
            
            if (mltCode) {
                if (global.mongoConnected) await ChatLog.create({ userMessage: message, aiResponse: '[RAW CODE RETURNED]' }).catch(()=>null);
                // Return only the raw code
                return res.json({ type: 'raw', text: mltCode });
            }
        }

        // 2. Fetch context from Database or Fallback
        let contextStr = '';
        if (global.mongoConnected) {
            const portfolioItems = await PortfolioInfo.find({});
            contextStr = portfolioItems.map(item => `${item.key}: ${item.value}`).join('\n');
        } else {
            contextStr = `Name: Charles Yumul David\nRole: Information Technology Student\nLocation: Concepcion, Tarlac, Philippines\nEmail: chrlsdvd0777@gmail.com\nPhone: +63 977 048 7261\nBio: This Enterprise Data Management Portfolio showcases my EDM lab activities and my growing skills in managing and organizing data. I am a 19-year-old student with a strong interest in graphic design and digital creativity.\nEducation: Current: BS Information Technology. Senior High: Benigno S. Aquino National High School (HUMSS).\nCore Beliefs: Consistency and patience lead to quality output. Small improvements create long-term growth. Good effort always pays off.\nSkills: Graphic Design, Digital Art, Time Management, Problem Solving\nTech Stack: Python, Java, HTML, Canva, Photoshop, Affinity\nHobbies: Gaming, Designing, Music, Movies`;
        }

        const systemInstruction = `You are a professional portfolio assistant AI for Charles Yumul David. \nAnswer questions using ONLY the following context. If the answer is not in the context, be polite but explain you only answer questions about Charles' portfolio. Be concise, professional, and do not use markdown code blocks unless writing a very short snippet.\n\nCONTEXT:\n${contextStr}`;

        // Instantiate the model here to pass the system instruction
        const model = genAI.getGenerativeModel({ 
            model: "gemini-flash-latest",
            systemInstruction: systemInstruction 
        });

        const chat = model.startChat({
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 300,
            }
        });

        const result = await chat.sendMessage(message);
        const aiText = result.response.text();

        if (global.mongoConnected) {
            await ChatLog.create({ userMessage: message, aiResponse: aiText }).catch(()=>null);
        }

        res.json({ type: 'text', text: aiText });

    } catch (error) {
        console.error('Chat API Error:', error);
        res.status(500).json({ error: 'Failed to process request: ' + error.message });
    }
});

// GET /api/seed - Seed database with portfolio info and MLT codes
router.get('/seed', async (req, res) => {
    try {
        // Seed Portfolio Info
        await PortfolioInfo.deleteMany({});
        const infoToSeed = [
            { key: 'Name', value: 'Charles Yumul David' },
            { key: 'Role', value: 'Information Technology Student' },
            { key: 'Location', value: 'Concepcion, Tarlac, Philippines' },
            { key: 'Email', value: 'chrlsdvd0777@gmail.com' },
            { key: 'Phone', value: '+63 977 048 7261' },
            { key: 'Bio', value: 'This Enterprise Data Management Portfolio showcases my EDM lab activities and my growing skills in managing and organizing data. I am a 19-year-old student with a strong interest in graphic design and digital creativity.' },
            { key: 'Education', value: 'Current: BS Information Technology. Senior High: Benigno S. Aquino National High School (HUMSS).' },
            { key: 'Core Beliefs', value: 'Consistency and patience lead to quality output. Small improvements create long-term growth. Good effort always pays off.' },
            { key: 'Skills', value: 'Graphic Design, Digital Art, Time Management, Problem Solving' },
            { key: 'Tech Stack', value: 'Python, Java, HTML, Canva, Photoshop, Affinity' },
            { key: 'Hobbies', value: 'Gaming, Designing, Music, Movies' }
        ];
        await PortfolioInfo.create(infoToSeed);

        // Seed MLT Codes by reading from actual files
        await MLTCode.deleteMany({});
        const mltBaseDir = path.join(__dirname, '..', 'WSMIDTERMS');
        const mltCodes = [];
        
        for (let i = 1; i <= 8; i++) {
            const mltId = `MLT${i}`;
            const htmlPath = path.join(mltBaseDir, mltId, 'index.html');
            const cssPath = path.join(mltBaseDir, mltId, 'style.css');
            try {
                let codeContent = `<!-- ${mltId} index.html -->\n` + await fs.readFile(htmlPath, 'utf8');
                try {
                    const cssContent = await fs.readFile(cssPath, 'utf8');
                    codeContent += `\n\n/* ${mltId} style.css */\n` + cssContent;
                } catch(e) {}
                mltCodes.push({ mltId, code: codeContent });
            } catch (err) {
                console.log(`Could not read ${htmlPath}, skipping...`);
                // Provide placeholder if file is missing
                mltCodes.push({ mltId, code: `<!-- ${mltId} Source Code not found at ${htmlPath} -->` });
            }
        }
        await MLTCode.create(mltCodes);

        res.json({ message: 'Database seeded successfully', portfolioCount: infoToSeed.length, mltCount: mltCodes.length });
    } catch (error) {
        console.error('Seeding Error:', error);
        res.status(500).json({ error: 'Failed to seed database' });
    }
});

module.exports = router;
