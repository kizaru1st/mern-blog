import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_KEY,
  authDomain: "mern-blog-2f360.firebaseapp.com",
  projectId: "mern-blog-2f360",
  storageBucket: "mern-blog-2f360.appspot.com",
  messagingSenderId: "354301794865",
  appId: "1:354301794865:web:38d70cc2e0cf3f8ef6d310",
  measurementId: "G-QHSEFY7ECM",
};

export const app = initializeApp(firebaseConfig);