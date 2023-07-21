const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8008;

app.get('/numbers', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No URLs provided.' });
  }

  const urls = Array.isArray(url) ? url : [url];

  try {
    const responsePromises = urls.map(fetchNumbers);
    const responses = await Promise.allSettled(responsePromises);

    const validResponses = responses
      .filter(({ status }) => status === 'fulfilled')
      .map(({ value }) => value)
      .flat();

    const uniqueSortedNumbers = [...new Set(validResponses)].sort((a, b) => a - b);

    res.json({ numbers: uniqueSortedNumbers });
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

async function fetchNumbers(url) {
  try {
    const response = await axios.get(url, { timeout: 500 });
    return response.data.numbers;
  } catch (error) {
    console.error(`Error fetching numbers from ${url}:`, error.message);
    return [];
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
