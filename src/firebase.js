import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyA3D2Aj1jUVT08vPD1x7RxHhRaQcq1WUtk',
  authDomain: 'beyoglu-682f2.firebaseapp.com',
  projectId: 'beyoglu-682f2',
  storageBucket: 'beyoglu-682f2.appspot.com',
  messagingSenderId: '436281609651',
  appId: '1:436281609651:web:aa92b2fc5bbba088fb8fc6'
}

const isFirebaseConfigured = Boolean(
  firebaseConfig &&
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== 'API_KEY'
)

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)
const rtdb = getDatabase(app)

export { app, db, auth, storage, rtdb, isFirebaseConfigured }
export default { app, db, auth, storage, rtdb, isFirebaseConfigured }
