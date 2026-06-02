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


// // CREATE PRODUCT
// export const createProduct =
//   async (productData) => {

//     const data = {
//       ...productData,

//       createdAt: serverTimestamp(),

//       updatedAt: serverTimestamp()
//     };

//     return await addDoc(
//       productsRef,
//       data
//     );
// };


export const createProduct = async (
  productData
) => {
  try {

    const data = {
      ...productData,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    const docRef =
      await addDoc(
        productsRef,
        data
      );

    return docRef;

  } catch (error) {

    console.error(
      "FIRESTORE ADDDOC ERROR:",
      error
    );

    throw error;
  }
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
export const updateProduct = async (
  productId,
  productData
) => {
  try {
    const productRef = doc(
      db,
      "products",
      productId
    );

    await updateDoc(
      productRef,
      productData
    );

    return true;
  } catch (error) {
    console.error(
      "UPDATE PRODUCT ERROR:",
      error
    );

    return false;
  }
};


// DELETE PRODUCT
export const deleteProduct =
  async (productId) => {
    try {
      await deleteDoc(
        doc(db, "products", productId)
      );

      return true;

    } catch (error) {
      console.log(
        "DELETE PRODUCT ERROR:",
        error
      );

      return false;
    }
  };