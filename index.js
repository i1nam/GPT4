const express = require('express');
const { Hercai } = require('hercai');
const Monitor = require('ping-monitor');

const app = express();
const port = 3000;

const client = new Hercai();

app.get('/hercai/api', async (req, res) => {
  try {
    const messageContent = req.query.content;

    if (!messageContent) {
      console.log('No content provided in the request.');
      return res.status(400).json({ Response: 'I am GPT-4🤖 Designed and created by OpenAI' });
    }

    console.log(`Received request with content: ${messageContent}`);

    const response = await client.question({ model: 'v3-beta', content: messageContent });
    const reply = response.reply;

    console.log(`Generated reply: ${reply}`);

    res.json({ reply });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred' });
  }
});

app.listen(port, () => {
  console.log(`Express server is running at http://localhost:${port}!`);
});