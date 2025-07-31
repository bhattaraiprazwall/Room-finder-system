require("dotenv").config();
const axios = require("axios");

const chatBoat = {
  Help: async (req, res) => {
    const { message } = req.body;

    try {
      const aiResponse = await axios.post("https://api.openai.com/v1/chat/completions", {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: message }],
      }, {
        headers: {
          Authorization: `Bearer ${process.env.CHAT_BOAT_API}`,
          "Content-Type": "application/json",
        },
      });

      res.json({ reply: aiResponse.data.choices[0].message.content });
    } catch (error) {
      console.error("Error with AI chatbot:", error.response ? error.response.data : error.message);
      res.status(500).json({ reply: "Sorry, something went wrong.", error: error.response ? error.response.data : error.message });
    }
  }
};

module.exports = chatBoat;
