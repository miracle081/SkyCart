// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";


const firebaseConfig = {
    apiKey: "AIzaSyA-XKNShlFC1dy6v6PvLCFQUGokI1hVqSc",
    authDomain: "skycart-ad778.firebaseapp.com",
    projectId: "skycart-ad778",
    storageBucket: "skycart-ad778.appspot.com",
    messagingSenderId: "434062028320",
    appId: "1:434062028320:web:12d30de27446d445875645"
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