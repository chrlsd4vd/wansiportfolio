require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');
const apiRoutes = require('./routes');

const app = express();
const PORT = process.env.PORT || 5000;

global.mongoConnected = false;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 2000 // fail fast if no local db
})
.then(() => {
    console.log('MongoDB connected successfully');
    global.mongoConnected = true;
})
.catch(err => console.error('MongoDB connection error. Running in memory fallback mode!'));

// Security & Middleware
app.use(helmet({
    contentSecurityPolicy: false // Disabled for local dev and rendering raw code
}));
app.use(cors());
app.use(express.json({ limit: '10kb' })); 

// Rate limiting for the API
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});

app.use('/api', apiLimiter);
app.use('/api', apiRoutes);

// Serve Static Frontend Files from root WSPortfolio dir
const frontendPath = path.join(__dirname, '..');
app.use(express.static(frontendPath));

// Fallback to index.html for unknown routes
app.use((req, res) => {
    res.sendFile(path.join(frontendPath, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
