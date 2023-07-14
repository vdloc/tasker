import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyA8vqGCxE17O_YccPKpRqJJkM1ctAMGPIU',
  authDomain: 'real-todos-6d1b4.firebaseapp.com',
  databaseURL: 'https://real-todos-6d1b4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'real-todos-6d1b4',
  storageBucket: 'real-todos-6d1b4.appspot.com',
  messagingSenderId: '815744073117',
  appId: '1:815744073117:web:2a9a1f5a665e2bf36ac374',
  measurementId: 'G-52SZYCSRP5',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
