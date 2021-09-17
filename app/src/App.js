import React, { useCallback, useEffect } from 'react';
import { getToken } from 'firebase/messaging';

import './App.css';

const App = () => {
  const getFirebaseToken = useCallback(async () => {
    getToken({ vapidKey: process.env.REACT_APP_PUBLIC_VAPID_KEY }).then((currentToken) => {
      if (currentToken) {
        // Send the token to your server and update the UI if necessary
        // ...
      } else {
        // Show permission request UI
        console.log('No registration token available. Request permission to generate one.');
        // ...
      }
    }).catch((err) => {
      console.log('An error occurred while retrieving token. ', err);
      // ...
    });
  }, []);

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

  useEffect(() => {
    // Reister Firebase service worker
    navigator.serviceWorker.register('firebase-messaging-sw.js');
  }, []);

  return (
    <div className="App">
      <button onClick={getFirebaseToken}>
        Get token
      </button>
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
