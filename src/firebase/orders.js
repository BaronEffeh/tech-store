import {
  collection,
  doc,
  addDoc,
  updateDoc,
  getDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "./config";

const ordersRef = collection(db, "orders");

/* -------------------------------------------------------------------------- */
/*                                CREATE ORDER                                */
/* -------------------------------------------------------------------------- */

export const createOrder = async (data) => {
  return await addDoc(ordersRef, data);
};

/* -------------------------------------------------------------------------- */
/*                          REAL-TIME ORDERS LISTENER                         */
/* -------------------------------------------------------------------------- */

export const subscribeToOrders = (callback) => {
  const q = query(
    collection(db, "orders"),
    orderBy("createdAt", "desc")
  );

  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      callback(orders);
    },
    (error) => {
      console.error("Orders listener error:", error);
    }
  );
};

/* -------------------------------------------------------------------------- */
/*                           UPDATE ORDER DETAILS                             */
/* -------------------------------------------------------------------------- */

export async function updateOrderStatus(orderId, data) {
  try {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    const ref = doc(db, "orders", orderId);
    const snapshot = await getDoc(ref);

    if (!snapshot.exists()) {
      throw new Error("Order not found.");
    }

    const existing = snapshot.data();

    /* ---------------------------------------------------------------------- */
    /*                          DETECT WHAT CHANGED                           */
    /* ---------------------------------------------------------------------- */

    const changes = {
      statusChanged:
        existing.status !== data.status,

      paymentChanged:
        existing.paymentStatus !== data.paymentStatus,

      shippingChanged:
        (existing.shipping?.courier || "") !==
          (data.courier || "") ||

        (existing.shipping?.trackingNumber || "") !==
          (data.trackingNumber || "") ||

        (existing.shipping?.estimatedDelivery || "") !==
          (data.estimatedDelivery || ""),

      notesChanged:
        (existing.adminNotes || "") !==
        (data.adminNotes || ""),
    };

    /* ---------------------------------------------------------------------- */
    /*                         BUILD HISTORY ENTRY                            */
    /* ---------------------------------------------------------------------- */

    const historyEntry = {
      status: data.status,

      paymentStatus: data.paymentStatus,

      changedBy:
        currentUser?.displayName ||
        currentUser?.email ||
        "Administrator",

      role: "Administrator",

      notes: data.adminNotes || "",

      timestamp: Timestamp.now(),

      shipping: {
        courier: data.courier || "",
        trackingNumber: data.trackingNumber || "",
        estimatedDelivery:
          data.estimatedDelivery || "",
      },

      changes,
    };

    const history = [
      ...(existing.statusHistory || []),
      historyEntry,
    ];

    /* ---------------------------------------------------------------------- */
    /*                           UPDATE ORDER                                 */
    /* ---------------------------------------------------------------------- */

    await updateDoc(ref, {
      status: data.status,

      paymentStatus: data.paymentStatus,

      shipping: {
        ...(existing.shipping || {}),

        courier: data.courier || "",

        trackingNumber:
          data.trackingNumber || "",

        estimatedDelivery:
          data.estimatedDelivery || "",
      },

      adminNotes:
        data.adminNotes || "",

      statusHistory: history,

      lastUpdatedBy: {
        uid: currentUser?.uid || null,

        name:
          currentUser?.displayName ||
          currentUser?.email ||
          "Administrator",

        email:
          currentUser?.email || "",
      },

      updatedAt: serverTimestamp(),
    });

    return true;
  } catch (error) {
    console.error(
      "UPDATE ORDER ERROR:",
      error
    );

    return false;
  }
}
// export async function updateOrderStatus(
//   orderId,
//   data
// ) {
//   try {
//     const auth = getAuth();
//     const currentUser = auth.currentUser;
//     const ref = doc(db, "orders", orderId);
//     const snapshot = await getDoc(ref);

//     if (!snapshot.exists()) {
//       throw new Error("Order not found.");
//     }
//     const existing = snapshot.data();

//     /* ---------------------------------------------------------------------- */
//     /*                       BUILD HISTORY ENTRY                              */
//     /* ---------------------------------------------------------------------- */

//     const historyEntry = {
//       status: data.status,
//       paymentStatus: data.paymentStatus,
//       changedBy:
//         currentUser?.displayName ||
//         currentUser?.email ||
//         "Administrator",
//       role: "Administrator",
//       notes: data.adminNotes || "",
//       timestamp: Timestamp.now(),
//     };

//     /* ---------------------------------------------------------------------- */
//     /*          SAVE SHIPPING SNAPSHOT ONLY WHEN STATUS IS SHIPPED            */
//     /* ---------------------------------------------------------------------- */

//     if (data.status === "Shipped") {
//       historyEntry.shipping = {
//         courier:
//           data.courier || "",
//         trackingNumber:
//           data.trackingNumber || "",
//         estimatedDelivery:
//           data.estimatedDelivery || "",
//       };
//     }

//     const history = [
//       ...(existing.statusHistory || []),
//       historyEntry,
//     ];

//     /* ---------------------------------------------------------------------- */
//     /*                            UPDATE FIRESTORE                            */
//     /* ---------------------------------------------------------------------- */

//     await updateDoc(ref, {
//       status: data.status,
//       paymentStatus: data.paymentStatus,
//       shipping: {
//         ...(existing.shipping || {}),
//         courier:
//           data.courier || "",
//         trackingNumber:
//           data.trackingNumber || "",
//         estimatedDelivery:
//           data.estimatedDelivery || "",
//       },
//       adminNotes:
//         data.adminNotes || "",
//       statusHistory: history,
//       lastUpdatedBy: {
//         uid:
//           currentUser?.uid || null,
//         name:
//           currentUser?.displayName ||
//           currentUser?.email ||
//           "Administrator",
//         email:
//           currentUser?.email || "",
//       },
//       updatedAt:
//         serverTimestamp(),
//     });
//     return true;
//   }
//   catch (error) {
//     console.error(
//       "UPDATE ORDER ERROR:",
//       error
//     );
//     return false;
//   }

// }

/* -------------------------------------------------------------------------- */
/*                              CANCEL ORDER                                  */
/* -------------------------------------------------------------------------- */

export async function cancelOrder(orderId) {
  return updateOrderStatus(orderId, {
    status: "Cancelled",
    paymentStatus: "Pending",
    courier: "",
    trackingNumber: "",
    estimatedDelivery: "",
    adminNotes:
      "Order cancelled by administrator.",
  });

}

/* -------------------------------------------------------------------------- */
/*                            GET SINGLE ORDER                                */
/* -------------------------------------------------------------------------- */

export async function getOrder(orderId) {
  const ref = doc(db, "orders", orderId);
  const snapshot = await getDoc(ref);
  if (!snapshot.exists()) {
    throw new Error("Order not found.");
  }
  return {
    id: snapshot.id,
    ...snapshot.data(),
  };
}






// import {
//   collection,
//   doc,
//   addDoc,
//   updateDoc,
//   getDoc,
//   onSnapshot,
//   query,
//   orderBy,
//   serverTimestamp,
//   Timestamp,
// } from "firebase/firestore";

// import { getAuth } from "firebase/auth";

// import { db } from "./config";

// const ordersRef = collection(db, "orders");

// /* -------------------------------------------------------------------------- */
// /*                                CREATE ORDER                                */
// /* -------------------------------------------------------------------------- */

// export const createOrder = async (data) => {
//   return await addDoc(ordersRef, data);
// };

// /* -------------------------------------------------------------------------- */
// /*                          REAL-TIME ORDERS LISTENER                         */
// /* -------------------------------------------------------------------------- */

// export const subscribeToOrders = (callback) => {
//   const q = query(
//     collection(db, "orders"),
//     orderBy("createdAt", "desc")
//   );

//   return onSnapshot(
//     q,
//     (snapshot) => {
//       const orders = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));

//       callback(orders);
//     },
//     (error) => {
//       console.error("Orders listener error:", error);
//     }
//   );
// };

// /* -------------------------------------------------------------------------- */
// /*                           UPDATE ORDER DETAILS                             */
// /* -------------------------------------------------------------------------- */

// export async function updateOrderStatus(
//   orderId,
//   data
// ) {
//   try {

//     const auth = getAuth();

//     const currentUser = auth.currentUser;

//     const ref = doc(db, "orders", orderId);

//     const snapshot = await getDoc(ref);

//     if (!snapshot.exists()) {
//       throw new Error("Order not found.");
//     }

//     const existing = snapshot.data();

//     const history = [
//       ...(existing.statusHistory || []),

//       {
//         status: data.status,
//         paymentStatus: data.paymentStatus,

//         changedBy:
//           currentUser?.displayName ||
//           currentUser?.email ||
//           "Administrator",

//         role: "Administrator",

//         notes: data.adminNotes || "",

//         timestamp: Timestamp.now(),
//       },
//     ];

//     await updateDoc(ref, {
//       status: data.status,
//       paymentStatus: data.paymentStatus,
//       shipping: {
//         ...(existing.shipping || {}),
//         courier: data.courier,
//         trackingNumber: data.trackingNumber,
//         estimatedDelivery: data.estimatedDelivery,
//       },
//       adminNotes: data.adminNotes || "",
//       statusHistory: history,
//       lastUpdatedBy: {
//         uid: currentUser?.uid || null,
//         name:
//           currentUser?.displayName ||
//           currentUser?.email ||
//           "Administrator",
//         email: currentUser?.email || "",
//       },
//       updatedAt: serverTimestamp(),
//     });
//     return true;

//   } catch (error) {
//     console.error("UPDATE ORDER ERROR:", error);

//     return false;
//   }
// }

// /* -------------------------------------------------------------------------- */
// /*                              CANCEL ORDER                                  */
// /* -------------------------------------------------------------------------- */

// export async function cancelOrder(orderId) {

//   return updateOrderStatus(orderId, {

//     status: "Cancelled",

//     paymentStatus: "Pending",

//     courier: "",

//     trackingNumber: "",

//     estimatedDelivery: "",

//     adminNotes: "Order cancelled by administrator.",

//   });

// }

// /* -------------------------------------------------------------------------- */
// /*                            GET SINGLE ORDER                                */
// /* -------------------------------------------------------------------------- */

// export async function getOrder(orderId) {

//   const ref = doc(db, "orders", orderId);

//   const snapshot = await getDoc(ref);

//   if (!snapshot.exists()) {

//     throw new Error("Order not found.");

//   }

//   return {

//     id: snapshot.id,

//     ...snapshot.data(),

//   };

// }
