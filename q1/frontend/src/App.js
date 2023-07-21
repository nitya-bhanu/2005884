import React, { useState } from 'react';
import axios from 'axios';

const FetchValidAPIs = () => {
  const [urlInput, setUrlInput] = useState('');
  const [numbers, setNumbers] = useState([]);

  const handleUrlInputChange = (e) => {
    setUrlInput(e.target.value);
  };

  const fetchNumbers = async () => {
    try {
      const response = await axios.get(`/numbers?url=${encodeURIComponent(urlInput)}`);
      setNumbers(response.data.numbers);
    } catch (error) {
      console.error('Error fetching numbers:', error);
    }
  };

  return (
    <div>
      <h1>Number Management App</h1>
      <div>
        <input type="text" value={urlInput} onChange={handleUrlInputChange} />
        <button onClick={fetchNumbers}>Fetch Numbers</button>
      </div>
      {numbers.length > 0 ? (
        <div>
          <h2>Numbers:</h2>
          <ul>
            {numbers.map((number) => (
              <li key={number}>{number}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No numbers fetched yet.</p>
      )}
    </div>
  );
};

export default FetchValidAPIs;
