// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, setPersistence, browserLocalPersistence } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJ0te5j4CTAW3tpYUy1VALIDqBYGqXOYM",
  authDomain: "seedsync-a2c00.firebaseapp.com",
  projectId: "seedsync-a2c00",
  storageBucket: "seedsync-a2c00.firebasestorage.app",
  messagingSenderId: "829936056027",
  appId: "1:829936056027:web:5bbcae6fbec8c5ca4efefe",
  measurementId: "G-2QZQW5HPQB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

setPersistence(auth, browserLocalPersistence)
  .then(() => {
    console.log("Persistence set");
  })
  .catch((error) => {
    console.error("Persistence error", error);
  });

export { app, analytics, auth }; 