// src/firebase/hooks/useProducts.js

import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config";

export default function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onSnapshot(
      collection(db, "products"),
      (snapshot) => {
        const data = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
          .filter(
            (product) =>
              product.publish === true /*-- && --*/
            //   product.status !== "Out of stock"
          );

        setProducts(data);
        setLoading(false);
      },
      (error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { products, loading };
}






// // src/firebase/hooks/useProducts.js

// import { useEffect, useState } from "react";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../config";

// export default function useProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onSnapshot(
//       collection(db, "products"),
//       (snapshot) => {
//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setProducts(data);
//         setLoading(false);
//       },
//       (error) => {
//         console.error("Error fetching products:", error);
//         setLoading(false);
//       }
//     );

//     // Clean up the listener when the component unmounts
//     return () => unsubscribe();
//   }, []);

//   return { products, loading };
// }






// // src/firebase/hooks/useProducts.js
// import { useEffect, useState } from "react";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../config";
// // import { db } from "../firebase";

// export default function useProducts() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const snapshot = await getDocs(collection(db, "products"));

//         const data = snapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));

//         setProducts(data);
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return { products, loading };
// }