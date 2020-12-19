import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDGiIs2CVTVqoX7_UEcfl9lMX1joLMGNoA",
  authDomain: "discussion-12e9b.firebaseapp.com",
  databaseURL: "https://discussion-12e9b.firebaseio.com",
  projectId: "discussion-12e9b",
  storageBucket: "discussion-12e9b.appspot.com",
  messagingSenderId: "456545459698",
  appId: "1:456545459698:web:65cad01ee3aa467c999f6b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firestore database
const db = firebase.firestore();

// Simplified user type for referencing users
export type User = Pick<firebase.User, 'uid'| 'email'>

export type UserDetail = {
  email: string,
  photoUrl?: string,
  phoneNumber?: string,
  sex?: boolean,
  signuature?: string,
  nickname?: string
  }

export const usersCollection = db.collection('users') as firebase.firestore.CollectionReference<UserDetail>;

export type Post = {
  id?: string;
  by: User;
  content: string;
  date: firebase.firestore.Timestamp
}

export const postsCollection = db.collection('posts') as firebase.firestore.CollectionReference<Post>;

// Helper to get current time in Timestamp
export const timestampNow = firebase.firestore.Timestamp.now;

// Hook providing logged in user information
export const useLoggedInUser = () => {
  // Hold user info in state
  const [user, setUser] = useState<firebase.User | null>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged(u => setUser(u));

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe();
  }, []);

  return user;
};


export const useDetailUser = () => {
  const [userState, setUser] = useState<UserDetail | null>();
  const user = useLoggedInUser()

  useEffect(() => {
    user && (
      usersCollection.doc(user.uid).get()
    ).then(res => {
      const ud = res.data()
      setUser(ud)
    }).catch(e => console.error(e))
  }, [user])

  return userState;
  // Hold user info in state
 /* const [user, setUser] = useState<User | null>();
  const [error, setError] = useState<string>();

  // Setup onAuthStateChanged once when component is mounted
  useEffect(() => {
      const unsubscribe = firebase.auth().onAuthStateChanged(async (u) => {
      const userDetails = u && await usersCollection.where("uid", "==", u?.uid).get()
      setUser(userDetails?.docs?.[0]?.data() || null)
    })

    // Call unsubscribe in the cleanup of the hook
    return () => unsubscribe();
  }, []);
  */
};

// Sign up handler
export const signUp = async (email: string, password: string) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  const u = firebase.auth().currentUser;
  console.log(u)
  usersCollection.doc(u?.uid).set({
      email: email,
      phoneNumber: "",
      sex: false,
      nickname: "",
      photoUrl: ""
    })
}

  // Sign in handler
export const signIn = (email: string, password: string) =>
  firebase.auth().signInWithEmailAndPassword(email, password);

// Sign out handler
export const signOut = () => firebase.auth().signOut();