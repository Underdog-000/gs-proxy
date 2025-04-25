import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = process.env.PORT || 3000;
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxZ6sm7V7USoGref7RBcRWXKuzRKcXIwQ-AAhKQhr6S_XmZ0S8Zf29T1q1BJJD2ZZvZ/exec'; // <-- замени!

app.use(cors());
app.use(express.json());

app.post('/log', async (req, res) => {
  const { session_id, question, answer } = req.body;

  try {
    const response = await fetch(GOOGLE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id, question, answer })
    });

    const data = await response.json();
    res.status(200).json({ status: 'ok', googleResponse: data });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.listen(PORT, () => console.log(`Proxy is running on ${PORT}`));
