import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "beyoglu-682f2.firebaseapp.com",
  projectId: "beyoglu-682f2",
  storageBucket: "beyoglu-682f2.firebasestorage.app",
  messagingSenderId: "436281609651",
  appId: "1:436281609651:web:aa92b2fc5bbba088fb8fc6"
};

// Initialize Firebase app and commonly-used services
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const rtdb = getDatabase(app);

const isFirebaseConfigured = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'API_KEY')

// Named exports for selective imports, and a default export convenience object
export { app, db, auth, storage, rtdb, isFirebaseConfigured };
export default { app, db, auth, storage, rtdb, isFirebaseConfigured };