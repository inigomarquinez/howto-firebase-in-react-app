import React, { useCallback } from 'react';
import './App.css';

const App = () => {
  const registerDevice = useCallback(() => {
    fetch('http://localhost:4000/registerDevice', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // body data type must match "Content-Type" header
    });
    console.log('registerDevice');
  }, []);

  const sendNotification = useCallback(() => {
    fetch('http://localhost:4000/sendMessage', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({}) // body data type must match "Content-Type" header
    });
    console.log('sendNotification');
  }, []);

  return (
  <div className="App">
    <button onClick={registerDevice}>
      Register my device
    </button>
    <button onClick={sendNotification}>
      Send me a notification
    </button>
  </div>
);
  }

export default App;
