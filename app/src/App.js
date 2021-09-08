import React, { useCallback } from 'react';
import './App.css';

const App = () => {
  const registerDevice = useCallback(async () => {
    const payload = { deviceId: 'abc' };
    await fetch('http://localhost:4000/registerDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    console.log('registerDevice');
  }, []);

  const sendNotification = useCallback(async () => {
    const payload = { deviceId: 'abc' }
    await fetch('http://localhost:4000/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
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
