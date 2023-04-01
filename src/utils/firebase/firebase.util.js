import { initializeApp } from "firebase/app";

import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";

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

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// import shop_data from "../../shop-data.json";

// export const ShopData2 = async () => {
//   const shopDocRef = doc(db, "shop", "data");

//   const snapshot = await getDoc(shopDocRef);
//   try {
//     await setDoc(shopDocRef, { shop_data });
//   } catch (error) {
//     console.log(error);
//   }
// };

// ShopData2();

// return a._document.data.value.mapValue.fields.shop_data.arrayValue.values;

// createShopData();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
};

// export const ShopData = async () => {
//   const shopDocRef = doc(db, "shop", "data");

//   const shopSnapshot = await getDoc(shopDocRef);

//   // Returns the array ready
//   const firstList = shopSnapshot._document.data.value.mapValue.fields.shop_data.arrayValue.values;

//   return firstList.map((item) => item.mapValue.fields);
// };
