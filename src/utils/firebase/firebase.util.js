import { initializeApp } from "firebase/app";

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC3qH5PN4MrV-wtteiaFYXytoHJcSaLyUg",
  authDomain: "clothing-e-commerce-db-f5385.firebaseapp.com",
  projectId: "clothing-e-commerce-db-f5385",
  storageBucket: "clothing-e-commerce-db-f5385.appspot.com",
  messagingSenderId: "209797954553",
  appId: "1:209797954553:web:e373de35112667576c9b28",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  if (!userAuth) return;

  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password, displayName) => {
  if (!email || !password) return;

  const { user } = await createUserWithEmailAndPassword(auth, email, password);
  user.displayName = displayName;
  await createUserDocumentFromAuth(user);
};
