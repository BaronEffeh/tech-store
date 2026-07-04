import {
  // Box,
  // Typography,
  // CircularProgress,
  // Stack,
} from "@mui/material";

// import {
//   collection,
//   query,
// //   where,
//   orderBy,
//   onSnapshot,
// } from "firebase/firestore";

// import {
//   useEffect,
//   useMemo,
//   useState,
// } from "react";

// import { db } from "../../firebase/config";

// import NotificationCard from "../components/notifications/NotificationCard";
// import NotificationFilters from "../components/notifications/NotificationFilters";
// import NotificationEmpty from "../components/notifications/NotificationEmpty";

export default function Notifications() {
  // const [notifications, setNotifications] =
  //   useState([]);

  // const [loading, setLoading] =
  //   useState(true);

  // const [search, setSearch] =
  //   useState("");

  // const [filter, setFilter] =
  //   useState("all");

  // useEffect(() => {
  //   const q = query(
  //     collection(db, "orders"),
  //     orderBy("createdAt", "desc")
  //   );

  //   const unsubscribe = onSnapshot(
  //     q,
  //     (snapshot) => {
  //       setNotifications(
  //         snapshot.docs.map((doc) => ({
  //           id: doc.id,
  //           ...doc.data(),
  //         }))
  //       );

  //       setLoading(false);
  //     }
  //   );

  //   return unsubscribe;
  // }, []);

  // const filtered =
  //   useMemo(() => {
  //     return notifications.filter(
  //       (order) => {
  //         const matchesSearch =
  //           order.customer?.name
  //             ?.toLowerCase()
  //             .includes(
  //               search.toLowerCase()
  //             );

  //         const matchesFilter =
  //           filter === "all"
  //             ? true
  //             : filter === "new"
  //             ? order.isNew
  //             : !order.isNew;

  //         return (
  //           matchesSearch &&
  //           matchesFilter
  //         );
  //       }
  //     );
  //   }, [
  //     notifications,
  //     search,
  //     filter,
  //   ]);

  // const handleOpen =
  //   (notification) => {
  //     console.log(notification);

  //     // Next step:
  //     // Mark notification as read
  //     // Open Order Management Dialog
  //   };

  return (
    <div>Notifivations notification Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aliquam atque velit commodi ex, dolor eligendi repudiandae explicabo cumque at beatae. Corrupti soluta quae aperiam autem, beatae esse eius voluptas provident.</div>
  );
}