const express = require("express");
const axios = require("axios");


const app = express();
const port = 3000;

app.use(express.json());

app.all('/', (req, res) => {
    console.log("Just got a request!")
    res.send('Yo! hola')
})

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await sendMessageToChatGPT(message);
    res.json({ response });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Something went wrong." });
  }
});

async function sendMessageToChatGPT(message) {
  const apiUrl = "https://api.openai.com/v1/chat/completions";
  const apiKey = "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"; // Ganti dengan API key Anda
  const model = "gpt-3.5-turbo"; // Model ChatGPT yang akan digunakan

  const response = await axios.post(
    apiUrl,
    {
      model,
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
    }
  );

  return response.data.choices[0].message.content;
}

app.listen(process.env.PORT || 3000)


