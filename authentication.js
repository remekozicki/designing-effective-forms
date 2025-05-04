// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCFJ-v652R4Fam7ZG3KE6HW8Bc_ZVimIog",
    authDomain: "tpf-lab4-9edc9.firebaseapp.com",
    projectId: "tpf-lab4-9edc9",
    storageBucket: "tpf-lab4-9edc9.firebasestorage.app",
    messagingSenderId: "405540155087",
    appId: "1:405540155087:web:99c830561bc0212223d1ba",
    measurementId: "G-8FZXZQXC3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const facebookProvider = new FacebookAuthProvider();

const signInButton = document.querySelector("#googleSignInButton");
const githubSignInButton = document.querySelector("#githubSignInButton");
const facebookSignInButton = document.querySelector("#facebookSignInButton");
const signOutButton = document.querySelector("#signOutButton");

const userSignInWithGoogle = async () => {
    signInWithPopup(auth, googleProvider).then((result) => {
        const user = result.user;
        console.log(user);
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

// Funkcja logowania przez GitHub
const userSignInWithGitHub = async () => {
    try {
        const result = await signInWithPopup(auth, githubProvider);
        const user = result.user;
        console.log('Zalogowano przez GitHub:', user);
        alert(`Witaj ${user.displayName || user.email}!`);
    } catch (error) {
        console.error('Błąd logowania GitHub:', error.code, error.message);
        alert(`Błąd logowania GitHub: ${error.message}`);
    }
};

// Funkcja logowania przez Facebook
const userSignInWithFacebook = async () => {
    try {
        const result = await signInWithPopup(auth, facebookProvider);
        const user = result.user;
        console.log('Zalogowano przez Facebook:', user);
        alert(`Witaj ${user.displayName || user.email}!`);
    } catch (error) {
        console.error('Błąd logowania Facebook:', error.code, error.message);
        alert(`Błąd logowania Facebook: ${error.message}`);
    }
};


const userSignOut = async () => {
    signOut(auth).then(() => {
        alert("You have been signed out!")
    }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
    })
}

onAuthStateChanged(auth, (user) => {
    if (user) {
        alert("You are authenticated with Google");
        console.log(user);
        fillUserDataOnForm(user);
    }
})

function fillUserDataOnForm(user) {
    const fullName = user.displayName || "";
    const email = user.email || "";
    const phoneNumber = user.phoneNumber || "";

    // Rozdziel imię i nazwisko
    let firstName = "";
    let lastName = "";

    if (fullName) {
        const nameParts = fullName.split(' ');
        firstName = nameParts[0] || "";
        lastName = nameParts.slice(1).join(' ') || ""; // Obsłuży drugie imię itd.
    }

    // Uzupełnianie pól formularza
    document.getElementById('firstName').value = firstName;
    document.getElementById('lastName').value = lastName;
    document.getElementById('exampleInputEmail1').value = email;
    document.getElementById('phoneNumber').value = phoneNumber;
}

const myForm = document.getElementById('form');


githubSignInButton.addEventListener("click", userSignInWithGitHub);
facebookSignInButton.addEventListener("click", userSignInWithFacebook);
signInButton.addEventListener("click", userSignInWithGoogle);

signOutButton.addEventListener("click", userSignOut);

