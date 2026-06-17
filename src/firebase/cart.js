// src/firebase/cart.js
import { db } from "./config";
import {
  doc,
  getDoc,
  updateDoc,
  setDoc,
  serverTimestamp,
} from "firebase/firestore";

/**
 * Load the user's cart from Firestore.
 */
export async function loadCart(uid) {
  if (!uid) return [];

  const userRef = doc(db, "users", uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    return [];
  }

  return snap.data().cart || [];
}

/**
 * Save the entire cart array.
 */
export async function saveCart(uid, cart) {
  if (!uid) return;

  const userRef = doc(db, "users", uid);

  await setDoc(
    userRef,
    {
      cart,
      updatedAt: serverTimestamp(),
    },
    { merge: true }
  );
}

/**
 * Clear the user's cart.
 */
export async function clearUserCart(uid) {
  if (!uid) return;

  const userRef = doc(db, "users", uid);

  await updateDoc(userRef, {
    cart: [],
    updatedAt: serverTimestamp(),
  });
}