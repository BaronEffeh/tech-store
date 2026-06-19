import { db } from "./config";
import { collection, getDocs } from "firebase/firestore";

export async function getOrders() {
  const snapshot = await getDocs(collection(db, "orders"));

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}