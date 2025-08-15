const express = require('express');
const router = express.Router();
const chatbotService = require('../services/chatbot');

module.exports = (gemini) => {
  router.post('/chat', async (req, res) => {
    try {
      const { message } = req.body;
      if (!message) return res.status(400).json({ error: "Message is required" });

      // Use IP as session ID (or could be a token if logged in)
      const sessionId = req.ip;

      const reply = await chatbotService.handleUserMessage(message, gemini, sessionId);
      res.json({ reply });
    } catch (err) {
      console.error("❌ Chat route error:", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  return router;
};
