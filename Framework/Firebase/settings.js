// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { initializeFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import 'firebase/compat/storage';
import firebase from "firebase/compat/app";


const firebaseConfig = {
    apiKey: "AIzaSyCcPYkoIoIregXU621aJ6MovopFk17UT4M",
    authDomain: "qp-bills.firebaseapp.com",
    projectId: "qp-bills",
    storageBucket: "qp-bills.appspot.com",
    messagingSenderId: "53929085243",
    appId: "1:53929085243:web:9ec6cf46c9790505cf4f1e"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
export const imgStorage = firebase.storage;
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = initializeFirestore(app, {
    experimentalForceLongPolling: true,
});
export { auth };