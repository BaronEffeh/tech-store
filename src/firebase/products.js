import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  getDoc,
  serverTimestamp
} from "firebase/firestore";

import { db } from "./config";

const productsRef = collection(
  db,
  "products"
);



// CREATE PRODUCT
export const createProduct =
  async (productData) => {

    const data = {
      ...productData,

      createdAt: serverTimestamp(),

      updatedAt: serverTimestamp()
    };

    return await addDoc(
      productsRef,
      data
    );
};



// GET ALL PRODUCTS
export const getProducts =
  async () => {

    const snapshot =
      await getDocs(productsRef);

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
};



// GET SINGLE PRODUCT
export const getProduct =
  async (id) => {

    const productDoc = doc(
      db,
      "products",
      id
    );

    const snapshot =
      await getDoc(productDoc);

    return {
      id: snapshot.id,
      ...snapshot.data()
    };
};



// UPDATE PRODUCT
export const updateProduct =
  async (id, data) => {

    const productDoc = doc(
      db,
      "products",
      id
    );

    return await updateDoc(
      productDoc,
      {
        ...data,
        updatedAt: serverTimestamp()
      }
    );
};



// DELETE PRODUCT
export const deleteProduct =
  async (id) => {

    const productDoc = doc(
      db,
      "products",
      id
    );

    return await deleteDoc(
      productDoc
    );
};