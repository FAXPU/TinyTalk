// Replace these with your Firebase project keys
const firebaseConfig = {
    apiKey: "AIzaSyBZvogTLy4LFDUFYMdv29cvyW4pLXZbgnA",
    authDomain: "tinytalk-f1aac.firebaseapp.com",
    projectId: "tinytalk-f1aac",
    storageBucket: "tinytalk-f1aac.firebasestorage.app",
    messagingSenderId: "5632445616",
    appId: "1:5632445616:web:c24621da16a61ac6da3f75"
};

// Initialize Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

