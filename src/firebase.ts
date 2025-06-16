    import { initializeApp } from "firebase/app";
    import { getAnalytics } from "firebase/analytics";
    import { getFirestore } from "firebase/firestore";

    const firebaseConfig = {
    apiKey: "AIzaSyD0vuV1tkmHbnvVDbgU9jt3meB5-nq1z3w",
    authDomain: "mini-blog-98934.firebaseapp.com",
    projectId: "mini-blog-98934",
    storageBucket: "mini-blog-98934.appspot.com",
    messagingSenderId: "330326542685",
    appId: "1:330326542685:web:f16cd4f940b373a49100b4",
    measurementId: "G-5TBF0DMC2X"
    };

    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);

    export const db = getFirestore(app);