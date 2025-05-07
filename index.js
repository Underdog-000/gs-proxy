import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

app.post('/log', async (req, res) => {
  try {
    const { question, answer, session_id, landing_id } = req.body;

    if (!question || !answer || !session_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Заменить на свой Web App URL от Google Apps Script
    const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyhxdlT1d4UBq-qmrZyO0_rzt9PW__CiI9ONrHpbLUIEgfS-90yrd9p6s58xIAPUyhE/exec';

    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, answer, session_id, landing_id })
    });

    const result = await response.text(); // Google Script обычно возвращает просто "ok"
    res.send(result);
  } catch (err) {
    console.error('Error in /log →', err);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/', (req, res) => {
  res.send('✅ Proxy is alive!');
});

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
