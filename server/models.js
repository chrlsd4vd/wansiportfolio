const mongoose = require('mongoose');

const portfolioInfoSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  value: { type: String, required: true }
});

const mltCodeSchema = new mongoose.Schema({
  mltId: { type: String, required: true, unique: true },
  code: { type: String, required: true }
});

const chatLogSchema = new mongoose.Schema({
  userMessage: { type: String, required: true },
  aiResponse: { type: String, required: true },
  timestamp: { type: Date, default: Date.now }
});

module.exports = {
  PortfolioInfo: mongoose.model('PortfolioInfo', portfolioInfoSchema),
  MLTCode: mongoose.model('MLTCode', mltCodeSchema),
  ChatLog: mongoose.model('ChatLog', chatLogSchema)
};
