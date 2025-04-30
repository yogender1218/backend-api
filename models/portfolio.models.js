const mongoose = require('mongoose');

// Form schema definition
const portfolioSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, // Email format validation
  },
  subject: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
}, { timestamps: true });

// Model creation
const PortfolioData = mongoose.model('PortfolioData', portfolioSchema);

module.exports = PortfolioData;
