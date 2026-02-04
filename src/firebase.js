// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // AJOUTÉ
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDozqnJK9oMcSbQ5OK9DUbM8k_NCfCpZGA",
  authDomain: "mpnjc-eglise.firebaseapp.com",
  projectId: "mpnjc-eglise",
  storageBucket: "mpnjc-eglise.firebasestorage.app",
  messagingSenderId: "943282909890",
  appId: "1:943282909890:web:e559eaf8c06c50c5df815b",
  measurementId: "G-TZETPV24QJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// EXPORTER LA BASE DE DONNÉES (C'est ce qui manquait pour le build)
export const db = getFirestore(app);
export const auth = getAuth(app);