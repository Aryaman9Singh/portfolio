process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

// Load environment variables
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json()); // parse JSON body

// Ensure API key is set
if (!process.env.OPENAI_API_KEY) {
  console.error("ERROR: OPENAI_API_KEY is missing in .env file");
  process.exit(1);
}

// Initialize OpenAI client
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running!");
});

// Route to summarize text
app.post("/summarize-text", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({ error: "Text is empty" });
    }

    console.log("Received text:", text);

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that summarizes text clearly and concisely.",
        },
        {
          role: "user",
          content: text,
        },
      ],
    });

    const summary = response.choices?.[0]?.message?.content;

    if (!summary) {
      console.error("No summary returned from OpenAI:", response);
      return res.status(500).json({ error: "Failed to summarize text" });
    }

    console.log("OpenAI summary:", summary);

    res.json({ summary });
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to summarize text" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
