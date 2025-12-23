import { auth } from "../firebase-config.js";
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";

const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, user => {
    if (!user) {
        window.location.href = "login.html";
    }
});

logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => {
        window.location.href = "login.html";
    });
});

