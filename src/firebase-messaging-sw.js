importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.1/firebase-messaging-compat.js');

firebase.initializeApp({
    apiKey: "AIzaSyDYXbOmPpcvD-tTFqRZuDvt75nvjHou1EI",
    authDomain: "car-rental-236aa.firebaseapp.com",
    projectId: "car-rental-236aa",
    storageBucket: "car-rental-236aa.appspot.com",
    messagingSenderId: "805399031928",
    appId: "1:805399031928:web:308457cd9b7b8ea441fd8d",
    measurementId: "G-2GZT37VSQL"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    self.registration.getNotifications().then((notifications) => {
        const notificationTitle = payload.notification.title;
        const notificationOptions = {
            body: payload.notification.body,
            icon: '/assets/icons/icon-72x72.png',
            renotify: false,
            timestamp: Date.now()
        };

        // Kiểm tra xem có thông báo nào đang được hiển thị hay không
        if (notifications.some(notification => notification.title === notificationTitle && notification.body === notificationOptions.body)) {
            return;
        }

        // Hiển thị thông báo nếu không có thông báo nào đang được hiển thị
        self.registration.showNotification(notificationTitle, notificationOptions);
    });
});