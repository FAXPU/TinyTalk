import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { collection, query, where, onSnapshot, orderBy } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const usernameDisplay = document.getElementById("usernameDisplay");
const newUsername = document.getElementById("newUsername");
const updateBtn = document.getElementById("updateUsernameBtn");
const myTweets = document.getElementById("myTweets");
const logoutBtn = document.getElementById("logoutBtn");

onAuthStateChanged(auth, user => {
    if (!user) return window.location.href = "login.html";
    usernameDisplay.textContent = user.displayName || "Anonymous";

    // Load user's tweets
    const tweetsCol = collection(db, "tweets");
    const q = query(tweetsCol, where("uid", "==", user.uid), orderBy("timestamp", "desc"));
    onSnapshot(q, snapshot => {
        myTweets.innerHTML = "";
        snapshot.forEach(docSnap => {
            const data = docSnap.data();
            myTweets.innerHTML += `
                <div class="tweet">
                    <p>${data.content}</p>
                    ${data.gif ? `<img src="${data.gif}"/>` : ""}
                    <div>❤️ ${data.likes}</div>
                </div>
            `;
        });
    });
});

updateBtn.addEventListener("click", async () => {
    if (!newUsername.value.trim()) return;
    await updateProfile(auth.currentUser, { displayName: newUsername.value.trim() });
    usernameDisplay.textContent = auth.currentUser.displayName;
    newUsername.value = "";
});

logoutBtn.addEventListener("click", () => {
    signOut(auth).then(() => window.location.href = "login.html");
});

