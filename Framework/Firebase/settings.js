// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";


const firebaseConfig = {
    apiKey: "AIzaSyBpuHeiWgqh1RIx8Io0EFUB8qVfMUqZ41s",
    authDomain: "x-note-5fd32.firebaseapp.com",
    projectId: "x-note-5fd32",
    storageBucket: "x-note-5fd32.appspot.com",
    messagingSenderId: "220127384688",
    appId: "1:220127384688:web:f92c5814eba1d18c1050b5"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const imgStorage = firebase.storage;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, { experimentalForceLongPolling: true, });
// export const db = getFirestore(app);

export { auth };