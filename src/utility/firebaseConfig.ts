import { initializeApp, type FirebaseApp } from 'firebase/app'
import { Firestore, getFirestore } from 'firebase/firestore'
import { getAuth, type Auth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: 'shopopedia-7d52a.firebaseapp.com',
  projectId: 'shopopedia-7d52a',
  storageBucket: 'shopopedia-7d52a.firebasestorage.app',
  messagingSenderId: String(import.meta.env.VITE_MESSAGING_ID),
  appId: String(import.meta.env.VITE_APP_ID),
  measurementId: String(import.meta.env.VITE_MEASUREMENT_ID),
}

const app: FirebaseApp = initializeApp(firebaseConfig)
const db: Firestore = getFirestore(app)
const auth: Auth = getAuth(app)


export { app as fireBaseApp, db as fireBaseDB, auth }
