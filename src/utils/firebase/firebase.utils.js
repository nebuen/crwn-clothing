import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
//////
/////
/////
const firebaseConfig = {
  apiKey: "AIzaSyCcBqd88zi4VqaV276FaDSo7zubZyyLrD0",
  authDomain: "crwn-clothing-db-a5732.firebaseapp.com",
  projectId: "crwn-clothing-db-a5732",
  storageBucket: "crwn-clothing-db-a5732.appspot.com",
  messagingSenderId: "575163198086",
  appId: "1:575163198086:web:06b1a80931073806887f07",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// Dahil google lang ang kinuha natin authentication service
//

// The prompt parameter determines the behavior of the Google sign-in prompt.
//By setting it to "select_account", the prompt will always ask the user
//to select their account, ensuring that they are prompted to choose an
//account even if they have previously signed in.
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
  prompt: "select_account",
});

// Sign in with Google using pop-up
// The reason for this is that by using a named function,
// signInWithGooglePopup, you can """export""" it as a separate function
// from the module, allowing other parts of your code to import and use it.
export const auth = getAuth();
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);
// instantiate the firestore para magamit ung doc,getdoc at setdoc
export const db = getFirestore();

// this is a method/ function
// getting from the authentication service(google), and then
// we're going to store that inside of firestore online
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  // kuha and database or db, then users is ung 'collections' next is ung uid
  const userDocRef = doc(db, "users", userAuth.uid);
  //console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);
  // console.log(userSnapshot);
  // console.log(userSnapshot.exists());

  // if user data does not exists
  // create / set the document with the data from userAuth in my collection

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log("error creating the user", error.message);
    }
  }
  // return userDocRef
  return userDocRef;
  // if user data exist
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};
