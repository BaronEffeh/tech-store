import { useNavigate } from "react-router-dom";
import { isSameDay, isThisWeek } from "date-fns";
import { markOrderAsRead, hideNotification } from "../../firebase/orders";

import {
  Box,
  Typography,
  CircularProgress,
  Stack,
} from "@mui/material";

import {
  collection,
  query,
//   where,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import { db } from "../../firebase/config";

import NotificationCard from "../components/notifications/NotificationCard";
import NotificationFilters from "../components/notifications/NotificationFilters";
import NotificationEmpty from "../components/notifications/NotificationEmpty";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [search, setSearch] =
    useState("");

  const [filter, setFilter] =
    useState("all");

  useEffect(() => {
    const q = query(
      collection(db, "orders"),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        setNotifications(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }))
        );

        setLoading(false);
      }
    );

    return unsubscribe;
  }, []);



  const filtered =
    useMemo(() => {
      return notifications.filter(
        (order) => {

          if (order.hidden) return false;
          
          const keyword = search.toLowerCase();

          const matchesSearch = [
            order.id,
            order.customer?.name,
            order.customer?.email,
            order.customer?.phone,
          ]
          .filter(Boolean)
          .some(value =>
            String(value)
                .toLowerCase()
                .includes(keyword)
          );
          // const matchesSearch =
          //   order.customer?.name
          //     ?.toLowerCase()
          //     .includes(
          //       search.toLowerCase()
          //     );

          const matchesFilter = (() => {
            const now = new Date();
            const created = order.createdAt?.toDate();

              switch (filter) {
                case "all":
                  return true;

                case "new":
                  return order.isNew === true;

                case "read":
                  return order.isNew === false;

                case "today":
                  return created && isSameDay(created, now);

                case "week":
                  return created && isThisWeek(created);

                case "pending":
                  return order.status === "Pending";

                case "processing":
                  return order.status === "Processing";

                case "shipped":
                  return order.status === "Shipped";

                case "delivered":
                  return order.status === "Delivered";

                case "cancelled":
                  return order.status === "Cancelled";

                default:
                  return true;
              }
          })();

          // // const matchesFilter =
          // //   filter === "all"
          // //     ? true
          // //     : filter === "new"
          // //     ? order.isNew
          // //     : !order.isNew;

          return (
            matchesSearch &&
            matchesFilter
          );
        }
      );
    }, [
      notifications,
      search,
      filter,
    ]);

  // const handleOpen =
  //   (notification) => {
  //     console.log(notification);
  const handleOpen = async (notification) => {
    await markOrderAsRead(notification.id);

    navigate("/admin/orders", {
        state: {
            orderId: notification.id,
        },
    });
  };

  const handleDelete = async (notification) => {
    await hideNotification(notification.id);
  };

      // Next step:
      // Mark notification as read
      // Open Order Management Dialog
    // };

  return (
    <Box sx={{ml: 5}}>
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={1}
      >
        Notifications
      </Typography>

      <Typography
        color="text.secondary"
        mb={4}
      >
        Stay updated with new customer orders.
      </Typography>

      <NotificationFilters
        search={search}
        setSearch={setSearch}
        filter={filter}
        setFilter={setFilter}
      />

      {loading ? (
        <Box
          textAlign="center"
          py={10}
        >
          <CircularProgress />
        </Box>
      ) : filtered.length === 0 ? (
        <NotificationEmpty />
      ) : (
        <Stack spacing={2}>
          {filtered.map(
            (notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                onOpen={handleOpen}
                onDelete={handleDelete}
              />
            )
          )}
        </Stack>
      )}
    </Box>
  );
}