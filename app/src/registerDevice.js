import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from "firebase/messaging";

let initializedFirebaseApp;

export const registerDeviceInFirebase = async () => {
  try {
    // assert(!('Notification' in window), 'This browser does not support desktop notification');

    const firebaseOptions = {
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
      measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
    };

    const firebaseAppSettings = {
      name: 'howto-firebase-in-react-app',
      automaticDataCollectionEnabled: false
    };

    initializedFirebaseApp = initializeApp(firebaseOptions, firebaseAppSettings);
    const messaging = getMessaging(initializedFirebaseApp);
    await navigator.serviceWorker.register('./firebase-messaging-sw.js');

    // https://github.com/bradtraversy/node_push_notifications/issues/1#issuecomment-389413687
    await navigator.serviceWorker.ready;

    const token = await getToken(messaging, {
      vapidKey: process.env.REACT_APP_FIREBASE_PUBLIC_VALID_KEY,
    });

    navigator.serviceWorker.addEventListener('message', e => {
      const { data: { data: { title, body } } } = e;
      alert(`${title}\n${body}`);
    });

    return token;
  } catch (error) {
    console.error(error);
  }
}