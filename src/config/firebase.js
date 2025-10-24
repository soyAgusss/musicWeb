// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDvKzGpqj-9VtfT8N5EfucfuEbbyNWeI5s",
  authDomain: "login-app-ec1b7.firebaseapp.com",
  projectId: "login-app-ec1b7",
  storageBucket: "login-app-ec1b7.firebasestorage.app",
  messagingSenderId: "739682815687",
  appId: "1:739682815687:web:f9602f8af6f24bb4a4b8e2",
  measurementId: "G-20STYFYL8T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const analytics = getAnalytics(app);

export { auth, googleProvider, analytics };