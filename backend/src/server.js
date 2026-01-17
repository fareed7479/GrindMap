import express from 'express';
import cors from 'cors';
import { corsOptions } from './config/cors.js';
import { scrapeLeetCode } from './services/scraping/leetcode.scraper.js';

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' }));

app.get('/api/leetcode/:username', async (req, res) => {
  try {
    const data = await scrapeLeetCode(req.params.username);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
