import { User } from '@/types';
import {
  type User as FirebaseUser,
  GithubAuthProvider,
  GoogleAuthProvider,
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  setPersistence,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateEmail,
  updateProfile,
} from 'firebase/auth';

import firebaseApp from './app';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');
const githubAuthProvider = new GithubAuthProvider();
githubAuthProvider.addScope('profile');
githubAuthProvider.addScope('email');
googleAuthProvider.setCustomParameters({
  prompt: 'select_account',
});

export async function handleAuthStateChange(onChange: (user: User | null) => Promise<void>) {
  onAuthStateChanged(auth, onChange);
}

export async function createUser(email: string, password: string) {
  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  return user as User;
}

export async function signInUser(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence);
  const { user } = await signInWithEmailAndPassword(auth, email, password);
  return user as User;
}

export async function signOutUser() {
  await setPersistence(auth, browserLocalPersistence);
  await signOut(auth);
}

export async function updateUser({ displayName, email, photoURL }: User) {
  await updateProfile(auth.currentUser as FirebaseUser, {
    displayName,
    photoURL,
  });
  await updateEmail(auth.currentUser as FirebaseUser, email as string);
}

export async function signInWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const { user } = await signInWithPopup(auth, googleAuthProvider);
  return user;
}

export async function signUpWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const { user } = await signInWithPopup(auth, googleAuthProvider);
  return user;
}

export async function signInWithGithub() {
  const { user } = await signInWithPopup(auth, githubAuthProvider);
  return user;
}

export async function signInWithAnonymously() {
  const { user } = await signInAnonymously(auth);
  return user;
}
