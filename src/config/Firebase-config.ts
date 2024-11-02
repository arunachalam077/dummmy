

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBoK73TJxWszn-pyCV86jnjveLpT1iju04",
  authDomain: "instaxbot-a6c88.firebaseapp.com",
  projectId: "instaxbot-a6c88",
  storageBucket: "instaxbot-a6c88.appspot.com",
  messagingSenderId: "229692675855",
  appId: "1:229692675855:web:9278780a3c7d3b3fd4907a",
  measurementId: "G-9WNNHP5FQ5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
