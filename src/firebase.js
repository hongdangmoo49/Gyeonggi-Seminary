import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBIdq2hijCGIggoSMzDpFHBvvhO4RkIYFI",
  authDomain: "gyeonggi-seminary.firebaseapp.com",
  projectId: "gyeonggi-seminary",
  storageBucket: "gyeonggi-seminary.firebasestorage.app",
  messagingSenderId: "762045522311",
  appId: "1:762045522311:web:4a4a5866006e054b7f3322",
  measurementId: "G-0E7QP8ZHGF"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
