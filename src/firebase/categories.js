import {
  collection,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";

import { db } from "./config";

export const getCategories =
  async () => {
    try {
      const q = query(
        collection(db, "categories"),
        orderBy("order")
      );

      const snapshot =
        await getDocs(q);

      return snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

    } catch (error) {

      console.log(error);

      return [];
    }
  };
