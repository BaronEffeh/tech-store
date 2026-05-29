// src/firebase/config.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCQA7S0uYsfRosFkYvszaJ2Ymag493bMWM",
  authDomain: "tech-store-ab8a5.firebaseapp.com",
  projectId: "tech-store-ab8a5",
  storageBucket: "tech-store-ab8a5.firebasestorage.app",
  messagingSenderId: "274252447151",
  appId: "1:274252447151:web:d45703fe4133be43b3035a"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
