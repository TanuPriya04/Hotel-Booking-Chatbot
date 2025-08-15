require('dotenv').config();
const { sequelize } = require('./models/conversation');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Gemini SDK import
const { GoogleGenerativeAI } = require('@google/generative-ai');
const gemini = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Chat routes
const chatRoutes = require('./routes/chat')(gemini);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Serve static frontend
app.use(express.static('public'));

// API routes
app.use('/', chatRoutes);

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}`);
  });
});

module.exports = app;
