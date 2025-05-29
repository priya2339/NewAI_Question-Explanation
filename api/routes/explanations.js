const express = require("express");
const router = express.Router();
const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
const Explanation = require("../models/Explanation");

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", async (req, res) => {
  const userPrompt = req.body.prompt;

  if (!userPrompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  const promptWithLang = `Explain the following question in both English and Hindi:\n\n${userPrompt}`;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const result = await model.generateContent(promptWithLang);
    const answer = result.response.text();

    // ✅ Save to MongoDB
    const saved = new Explanation({ question: userPrompt, answer });
    await saved.save();

    res.json({ answer });
  } catch (err) {
    console.error("❌ AI Generation Error:", err.message);
    res.status(500).json({ error: "Failed to get AI response", details: err.message });
  }
});

module.exports = router;
