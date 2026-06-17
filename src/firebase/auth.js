import { auth, db } from "./config";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Register a new customer.
 */
export async function registerUser({
  displayName,
  email,
  password,
}) {
  const credential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );

  const firebaseUser = credential.user;

  // Update Firebase Auth profile
  await updateProfile(firebaseUser, {
    displayName: displayName,
  });

  // Create Firestore user document
  await setDoc(doc(db, "users", firebaseUser.uid), {
    uid: firebaseUser.uid,
    displayName: displayName,
    email: firebaseUser.email,
    role: "customer",
    phone: "",
    photoURL: "",
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return firebaseUser;
}

/**
 * Update a user's profile in Firestore.
 */
export async function updateUserProfile(uid, data) {
  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    ...data,
    updatedAt: serverTimestamp(),
  });

  // Keep Firebase Authentication profile in sync
  if (auth.currentUser && data.displayName) {
    await updateProfile(auth.currentUser, {
      displayName: data.displayName,
    });
  }

  return true;
}

/**
 * Sign in.
 */
export async function loginUser(email, password) {
  const credential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  return credential.user;
}

/**
 * Sign out.
 */
export async function logoutUser() {
  await signOut(auth);
}

/**
 * Send password reset email.
 */
export async function resetPassword(email) {
  await sendPasswordResetEmail(auth, email);
}

/**
 * Read Firestore profile.
 */
export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, "users", uid));

  if (!snap.exists()) return null;

  return snap.data();
}