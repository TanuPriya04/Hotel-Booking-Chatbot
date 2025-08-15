module.exports = (gemini) => {
  return async (req, res) => {
    try {
      const userMessage = req.body.message;
      if (!userMessage) {
        return res.status(400).json({ error: 'Message is required' });
      }

      // Get Gemini model
      const model = gemini.getGenerativeModel({ model: 'gemini-2.5-flash' });

      // Retry mechanism for overloaded model
      let attempts = 3;
      let botReply = '';
      while (attempts > 0) {
        try {
          const result = await model.generateContent(userMessage);
          botReply =
            result?.response?.candidates?.[0]?.content?.parts?.[0]?.text || '';
          if (botReply) break; // Got a reply, exit loop
        } catch (err) {
          console.error(
            `Gemini API Error (attempt ${4 - attempts}):`,
            err.message || err
          );

          // Retry only if it's a 503 overload error
          if (err.message && err.message.includes('503') && attempts > 1) {
            console.log('Model overloaded. Retrying in 2 seconds...');
            await new Promise((resolve) => setTimeout(resolve, 2000));
          } else {
            throw err; // If it's a different error, stop retrying
          }
        }
        attempts--;
      }

      // If still no reply after retries, fallback message
      if (!botReply) {
        botReply = "Sorry, I'm having trouble responding right now. Please try again later.";
      }

      return res.json({ bot: botReply });

    } catch (error) {
      console.error('Unexpected Error:', error.message || error);
      return res.status(500).json({
        error: 'Something went wrong',
        details: error.message,
      });
    }
  };
};
