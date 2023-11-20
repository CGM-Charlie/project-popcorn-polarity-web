import React, { useState } from 'react';

const PredictionComponent = () => {
  const [inputString, setInputString] = useState('');
  const [prediction, setPrediction] = useState('');

  const handleInputChange = (e) => {
    setInputString(e.target.value);
  };

  const handlePredictClick = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: inputString }), // Ensure the body is a stringified object with the same structure your API expects
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const result = await response.json();
      setPrediction(result);
    } catch (error) {
      console.error('Failed to fetch prediction:', error);
    }
  };

  return (
    <div>
      <input type="text" value={inputString} onChange={handleInputChange} />
      <button onClick={handlePredictClick}>Predict</button>
        {console.log(prediction)}
    </div>
  );
};

export default PredictionComponent;
