import React, { useCallback, useState } from 'react';
import { registerDeviceInFirebase } from './registerDevice';

import './App.css';

const App = () => {
  const [token, setToken] = useState(null);

  const registerDevice = useCallback(async () => {
    const tk = await registerDeviceInFirebase();

    await fetch('http://localhost:4000/registerDevice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        deviceId: tk
      })
    });

    setToken(tk);
  }, []);

  const sendNotification = useCallback(async () => {
    const payload = { deviceId: token }
    await fetch('http://localhost:4000/sendMessage', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
  }, [token]);

  return (
    <div className="App">
      <button onClick={registerDevice}>
        Register my device
      </button>
      <button disabled={!token} onClick={sendNotification}>
        Send me a notification
      </button>
    </div>
  );
}

export default App;
