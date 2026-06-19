import { db } from "./config";
import {
  collection,
  getDocs,
} from "firebase/firestore";

export async function getCustomers() {
  const usersSnapshot = await getDocs(collection(db, "users"));
  const ordersSnapshot = await getDocs(collection(db, "orders"));

  const orders = ordersSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  return usersSnapshot.docs.map((doc) => {
    const user = {
      id: doc.id,
      ...doc.data(),
    };

    const customerOrders = orders.filter(
      (order) => order.userId === user.uid
    );

    const totalSpent = customerOrders.reduce(
      (sum, order) => sum + (Number(order.total) || 0),
      0
    );

    return {
      ...user,
      recentOrders: customerOrders,
      orders: customerOrders.length,
      spent: totalSpent,
      avgOrder:
        customerOrders.length > 0
          ? totalSpent / customerOrders.length
          : 0,
      lastOrder:
        customerOrders.length > 0
          ? customerOrders[0].createdAt
          : null,
    };
  });
}
