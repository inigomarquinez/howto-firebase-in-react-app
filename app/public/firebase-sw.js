/* eslint-disable */
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.2.5/firebase-messaging.js');

firebase.initializeApp({
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
});

messaging = firebase.messaging();

messaging.onBackgroundMessage(payload => {
  const { data: { body, title, icon } } = payload;

  self.registration.showNotification(title, {
    body,
    icon,
    actions: []
  });
});

self.addEventListener('notificationclick', event => {
  console.log('notificationclick', event)
});

self.addEventListener('notificationclose', event => {
  console.log('notificationclose', event)
});
