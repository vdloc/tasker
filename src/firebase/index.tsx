import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: 'AIzaSyA8vqGCxE17O_YccPKpRqJJkM1ctAMGPIU',
  authDomain: 'real-todos-6d1b4.firebaseapp.com',
  databaseURL:
    'https://real-todos-6d1b4-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'real-todos-6d1b4',
  storageBucket: 'real-todos-6d1b4.appspot.com',
  messagingSenderId: '815744073117',
  appId: '1:815744073117:web:2a9a1f5a665e2bf36ac374',
  measurementId: 'G-52SZYCSRP5',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    const errorCode = error.code;
    const errorMessage = error.message;
  }
}

export async function signInUser(email: string, password: string) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error: any) {
    console.log(error);

    const errorCode = error.code;
    const errorMessage = error.message;
  }
}
