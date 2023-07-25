import firebaseApp from './app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  updateEmail,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  GoogleAuthProvider,
  GithubAuthProvider,
  signInWithPopup,
  signInAnonymously,
  type User,
} from 'firebase/auth';

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);
const googleAuthProvider = new GoogleAuthProvider();
googleAuthProvider.addScope('profile');
googleAuthProvider.addScope('email');
const githubAuthProvider = new GithubAuthProvider();
githubAuthProvider.addScope('profile');
githubAuthProvider.addScope('email');

export async function handleAuthStateChange(onChange: (user: User | null) => void) {
  onAuthStateChanged(auth, onChange);
}

export async function createUser(email: string, password: string) {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error: any) {
    console.log(error.message);
  }
}

export async function signInUser(email: string, password: string) {
  await setPersistence(auth, browserLocalPersistence);
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
}

export async function signOutUser() {
  await setPersistence(auth, browserLocalPersistence);
  await signOut(auth);
}

export async function updateUser({ displayName, email, photoURL }: User) {
  await updateProfile(auth.currentUser as User, { displayName, photoURL });
  await updateEmail(auth.currentUser as User, email as string);
}

export async function signInWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const userCredential = await signInWithPopup(auth, googleAuthProvider);
  return userCredential.user;
}

export async function signUpWithGoogle() {
  await setPersistence(auth, browserLocalPersistence);
  const userCredential = await signInWithPopup(auth, googleAuthProvider);
  return userCredential.user;
}

export async function signInWithGithub() {
  const userCredential = await signInWithPopup(auth, githubAuthProvider);
  return userCredential.user;
}

export async function signInWithAnonymously() {
  const userCredential = await signInAnonymously(auth);
  return userCredential.user;
}
