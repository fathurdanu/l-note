import { initializeApp } from 'firebase/app';
import { getStorage } from "firebase/storage";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyD0YKUkCLwedNlan63CM3KdnslMlRGtXXc",
    authDomain: "l-note-3634a.firebaseapp.com",
    projectId: "l-note-3634a",
    storageBucket: "l-note-3634a.appspot.com",
    messagingSenderId: "241926133327",
    appId: "1:241926133327:web:9afa0ecbc5e75ab3347c3a"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

export {storage, firebaseApp}