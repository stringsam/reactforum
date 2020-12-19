import { useEffect, useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import {Thread, UserDetail} from "./types";

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

export const usersCollection = db.collection('users') as firebase.firestore.CollectionReference<UserDetail>;
export const threadsCollection = db.collection('threads') as firebase.firestore.CollectionReference<Thread>;

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
      usersCollection.doc(user.uid).onSnapshot(
        snapshot => {
          const ud = snapshot.data()
          setUser(ud)
            }));
  }, [user])

  return userState ? userState : {} as UserDetail;
};

// Sign up handler
export const signUp = async (email: string, password: string) => {
  await firebase.auth().createUserWithEmailAndPassword(email, password)
  const u = firebase.auth().currentUser;
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