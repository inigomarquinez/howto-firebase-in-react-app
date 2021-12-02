/* eslint-disable no-restricted-globals */
/* eslint-disable no-undef */
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: '<insert here your Firebase apiKey>',
  authDomain: '<insert here your Firebase authDomain>',
  databaseURL: '<insert here your Firebase databaseURL>',
  projectId: '<insert here your Firebase projectId>',
  storageBucket: '<insert here your Firebase storageBucket>',
  messagingSenderId: '<insert here your Firebase messagingSenderId>',
  appId: '<insert here your Firebase appId>',
  measurementId: '<insert here your Firebase measurementId>'
});

// Retrieve an instance of Firebase Messaging so that it can handle background messages.
const messaging = firebase.messaging();

// Handle incoming messages. Called when:
// - a message is received while the app has focus
// - the user clicks on an app notification created by a service worker
//   `messaging.onBackgroundMessage` handler.
// messaging.onMessage((payload) => {
//   console.log('Message received. ', payload);
//   // ...
// });

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// Keep in mind that FCM will still show notification messages automatically 
// and you should use data messages for custom notifications.
// For more info see: 
// https://firebase.google.com/docs/cloud-messaging/concept-options
messaging.onBackgroundMessage(function (payload) {
  const { data: { body, title } } = payload;

  // Customize notification here
  const notificationTitle = 'Notification for howto-firebase-in-react-app';
  const notificationOptions = {
    body,
    title,
    // icon: '/firebase-logo.png'
  };

  self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('install', function () {
  console.log('firebase-messaging-sw installed!')
});
