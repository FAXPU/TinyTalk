import { db, auth } from "../firebase-config.js";
import { collection, addDoc, onSnapshot, query, orderBy, updateDoc, doc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

const feed = document.getElementById("feed");
const postBtn = document.getElementById("postTweetBtn");
const tweetContent = document.getElementById("tweetContent");
const tweetGif = document.getElementById("tweetGif");

const tweetsCol = collection(db, "tweets");

postBtn.addEventListener("click", async () => {
    const content = tweetContent.value.trim();
    const gifURL = tweetGif.value.trim();
    if (!content) return alert("Tweet cannot be empty");

    await addDoc(tweetsCol, {
        content,
        gif: gifURL || "",
        likes: 0,
        comments: [],
        timestamp: Date.now(),
        uid: auth.currentUser.uid,
        username: auth.currentUser.displayName || "Anonymous"
    });

    tweetContent.value = "";
    tweetGif.value = "";
});

const q = query(tweetsCol, orderBy("timestamp", "desc"));
onSnapshot(q, snapshot => {
    feed.innerHTML = "";
    snapshot.forEach(docSnap => {
        const data = docSnap.data();
        feed.innerHTML += `
        <div class="tweet">
            <strong>${data.username}</strong>
            <p>${data.content}</p>
            ${data.gif ? `<img src="${data.gif}"/>` : ""}
            <div>
                <button onclick="likeTweet('${docSnap.id}', ${data.likes})">❤️ ${data.likes}</button>
                <button onclick="toggleComments('${docSnap.id}')">💬</button>
                <div id="comments-${docSnap.id}" style="display:none;"></div>
            </div>
        </div>
        `;
    });
});

// Dark / Light mode
const toggle = document.getElementById("themeToggle");
toggle.addEventListener("click", () => {
    if (document.documentElement.getAttribute("data-theme") === "dark") {
        document.documentElement.setAttribute("data-theme", "light");
    } else {
        document.documentElement.setAttribute("data-theme", "dark");
    }
});

window.likeTweet = async (id, currentLikes) => {
    const tweetDoc = doc(db, "tweets", id);
    await updateDoc(tweetDoc, { likes: currentLikes + 1 });
};

window.toggleComments = (id) => {
    const c = document.getElementById(`comments-${id}`);
    c.style.display = c.style.display === "none" ? "block" : "none";
};

