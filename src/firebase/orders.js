import {
  collection,
  addDoc,
  getDocs
} from "firebase/firestore";

import { db } from "./config";

const ordersRef = collection(
  db,
  "orders"
);



export const createOrder =
  async (data) => {

    return await addDoc(
      ordersRef,
      data
    );
};



export const getOrders =
  async () => {

    const snapshot =
      await getDocs(ordersRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
};