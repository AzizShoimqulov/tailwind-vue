import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "API_KEY",
  authDomain: "beyoglu-682f2.firebaseapp.com",
  projectId: "beyoglu-682f2",
  storageBucket: "beyoglu-682f2.firebasestorage.app",
  messagingSenderId: "436281609651",
  appId: "1:436281609651:web:aa92b2fc5bbba088fb8fc6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const isFirebaseConfigured = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'API_KEY')

export { db, isFirebaseConfigured };