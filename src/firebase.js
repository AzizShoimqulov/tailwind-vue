// import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { getStorage } from "firebase/storage";
// import { getDatabase } from "firebase/database";

// const firebaseConfig = {
//   apiKey: "API_KEY",
//   authDomain: "beyoglu-682f2.firebaseapp.com",
//   projectId: "beyoglu-682f2",
//   storageBucket: "beyoglu-682f2.firebasestorage.app",
//   messagingSenderId: "436281609651",
//   appId: "1:436281609651:web:aa92b2fc5bbba088fb8fc6"
// };

// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);
// const storage = getStorage(app);
// const rtdb = getDatabase(app);

// const isFirebaseConfigured = !!(firebaseConfig && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'API_KEY')

// export { app, db, auth, storage, rtdb, isFirebaseConfigured };
// export default { app, db, auth, storage, rtdb, isFirebaseConfigured };







// import { initializeApp } from "firebase/app";
//                //import { getAnalytics } from "firebase/analytics";
// // https://firebase.google.com/docs/web/setup#available-libraries

// const firebaseConfig = {
//   apiKey: "AIzaSyA3D2Aj1jUVT08vPD1x7RxHhRaQcq1WUtk",
//   authDomain: "beyoglu-682f2.firebaseapp.com",
//   projectId: "beyoglu-682f2",
//   storageBucket: "beyoglu-682f2.firebasestorage.app",
//   messagingSenderId: "436281609651",
//   appId: "1:436281609651:web:aa92b2fc5bbba088fb8fc6",
//   measurementId: "G-33E8SWY8F0"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
          //const analytics = getAnalytics(app);



import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA3D2Aj1jUVT08vPD1x7RxHhRaQcq1WUtk",
  authDomain: "beyoglu-682f2.firebaseapp.com",
  projectId: "beyoglu-682f2",
  storageBucket: "beyoglu-682f2.appspot.com",
  messagingSenderId: "436281609651",
  appId: "1:436281609651:web:aa92b2fc5bbba088fb8fc6"
};

const app = initializeApp(firebaseConfig);

export default app;