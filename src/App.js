import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select';

const App = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [error, setError] = useState('');

  // Options for multi-select dropdown
  const options = [
    { value: 'alphabets', label: 'Alphabets' },
    { value: 'numbers', label: 'Numbers' },
    { value: 'highest_lowercase_alphabet', label: 'Highest lowercase alphabet' }
  ];

  const handleJsonInputChange = (e) => {
    setJsonInput(e.target.value);
  };

  const handleSubmit = async () => {
    setError('');
    try {
      // Validate JSON input
      const parsedData = JSON.parse(jsonInput);
      // Call the API
      const res = await axios.post('https://api-zeta-smoky.vercel.app/bfhl', parsedData);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON input');
    }
  };

  const filterResponse = () => {
    if (!response) return {};
    const filteredResponse = {};
    selectedOptions.forEach(option => {
      if (option.value === 'alphabets') filteredResponse.alphabets = response.alphabets;
      if (option.value === 'numbers') filteredResponse.numbers = response.numbers;
      if (option.value === 'highest_lowercase_alphabet') filteredResponse.highest_lowercase_alphabet = response.highest_lowercase_alphabet;
    });
    return filteredResponse;
  };

  return (
    <div>
      <h1>Your Roll Number</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonInputChange}
        rows="5"
        cols="40"
        placeholder='Enter JSON like {"data": ["A","C","z"]}'
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {response && (
        <div>
          <Select
            isMulti
            options={options}
            onChange={setSelectedOptions}
          />
          <pre>{JSON.stringify(filterResponse(), null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;
