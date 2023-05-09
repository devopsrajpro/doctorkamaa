// Scripts for firebase and firebase messaging
// eslint-disable-next-line no-undef
if ("undefined" === typeof window) {
  importScripts("https://www.gstatic.com/firebasejs/8.2.0/firebase-app.js");
  importScripts(
    "https://www.gstatic.com/firebasejs/8.2.0/firebase-messaging.js"
  );
}

// eslint-disable-next-line no-undef

// Initialize the Firebase app in the service worker by passing the generated config
const firebaseConfig = {
  apiKey: "AIzaSyBjr88XKixd5QFjzWz-7EgB0fW-2sUwJxI",
  authDomain: "doctorkamaa.firebaseapp.com",
  projectId: "doctorkamaa",
  storageBucket: "doctorkamaa.appspot.com",
  messagingSenderId: "557496745132",
  appId: "1:557496745132:web:1c6590271a15c510b4f309",
  measurementId: "G-QNN8Z6K637",
};
// eslint-disable-next-line no-undef
firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
// eslint-disable-next-line no-undef
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = "New message from " + payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "logo192.png",
    tag: "notification-1",
    data: {
      url: payload.data.onClick || "https://doctorkamaa.com",
    },
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

messaging.onBackgroundMessage(function (payload) {
  const notificationTitle = payload.data.title;
  const notificationOptions = {
    body: payload.data.body,
    icon: "logo192.png",
    image:payload.data.image
    tag: "notification-1",
    data: {
      url: payload.data.url || "https://doctorkamaa.com",
    },
  };
  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});
//Code for adding event on click of notification
self.addEventListener("notificationclick", function (event) {
  let url = event.notification.data.url || "https://doctorkamaa.com";
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((windowClients) => {
      // Check if there is already a window/tab open with the target URL
      for (var i = 0; i < windowClients.length; i++) {
        var client = windowClients[i];
        // If so, just focus it.
        if (client.url === url && "focus" in client) {
          return client.focus();
        }
      }
      // If not, then open the target URL in a new window/tab.
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
