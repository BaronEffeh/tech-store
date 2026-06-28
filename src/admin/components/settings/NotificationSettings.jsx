import { useEffect, useState } from "react";

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Paper,
  Stack,
  Switch,
  Typography,
} from "@mui/material";

import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

import { useAuth } from "../../../context/AuthContext";
import {
  getNotificationSettings,
  updateNotificationSettings,
} from "../../../firebase/auth";

const DEFAULT_SETTINGS = {
  system: true,
  email: true,
  sms: false,
  orderUpdates: true,
  inventory: true,
  marketing: false,
};

export default function NotificationSettings() {
  const { user } = useAuth();

  const [notifications, setNotifications] =
    useState(DEFAULT_SETTINGS);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadSettings() {
      if (!user) return;

      const saved = await getNotificationSettings(user.uid);

      if (saved) {
        setNotifications({
          ...DEFAULT_SETTINGS,
          ...saved,
        });
      }
    }

    loadSettings();
  }, [user]);

  const toggle = (key) => (e) => {
    setNotifications((prev) => ({
      ...prev,
      [key]: e.target.checked,
    }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      setSaving(true);

      await updateNotificationSettings(
        user.uid,
        notifications
      );

      alert("Notification settings updated.");
    } catch (err) {
      console.error(err);
      alert("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = async () => {
    if (!user) return;

    const saved = await getNotificationSettings(user.uid);

    setNotifications(
      saved
        ? { ...DEFAULT_SETTINGS, ...saved }
        : DEFAULT_SETTINGS
    );
  };

  const settingCard = (
    icon,
    title,
    subtitle,
    key
  ) => (
    <Box
      sx={{
        border: "1px solid #e5e7eb",
        borderRadius: 2,
        p: 2,
      }}
    >
      <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
        >
          {icon}

          <Box>
            <Typography fontWeight={600}>
              {title}
            </Typography>

            <Typography
              variant="body2"
              sx={{ color: "#6b7280" }}
            >
              {subtitle}
            </Typography>
          </Box>
        </Stack>

        <Switch
          checked={notifications[key]}
          onChange={toggle(key)}
        />
      </Stack>
    </Box>
  );

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 3,
        borderRadius: 2,
        borderColor: "#e5e7eb",
      }}
    >
      <Typography variant="h6" fontWeight={700}>
        Notification Preferences
      </Typography>

      <Typography
        variant="body2"
        sx={{
          color: "#6b7280",
          mb: 4,
        }}
      >
        Manage how you receive updates
      </Typography>

      <Stack spacing={2}>
        {settingCard(
          <NotificationsNoneIcon />,
          "Enable Notifications",
          "Receive all system notifications",
          "system"
        )}

        {settingCard(
          <EmailOutlinedIcon />,
          "Email Notifications",
          "Get updates via email",
          "email"
        )}

        {settingCard(
          <SmsOutlinedIcon />,
          "SMS Notifications",
          "Get updates via text message",
          "sms"
        )}
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Typography fontWeight={700} mb={2}>
        Notification Types
      </Typography>

      <Stack>
        <FormControlLabel
          control={
            <Checkbox
              checked={notifications.orderUpdates}
              onChange={toggle("orderUpdates")}
            />
          }
          label="Order updates and status changes"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={notifications.inventory}
              onChange={toggle("inventory")}
            />
          }
          label="Low stock and inventory alerts"
        />

        <FormControlLabel
          control={
            <Checkbox
              checked={notifications.marketing}
              onChange={toggle("marketing")}
            />
          }
          label="Marketing and promotional emails"
        />
      </Stack>

      <Divider sx={{ my: 4 }} />

      <Stack
        direction="row"
        spacing={1.5}
        justifyContent="flex-end"
      >
        <Button
          variant="outlined"
          onClick={handleCancel}
          sx={{
            textTransform: "none",
            color: "#111827",
            borderColor: "#e5e7eb",
          }}
        >
          Cancel
        </Button>

        <Button
          variant="contained"
          startIcon={<SaveOutlinedIcon />}
          onClick={handleSave}
          disabled={saving}
          sx={{
            textTransform: "none",
            bgcolor: "#030521",
          }}
        >
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Stack>
    </Paper>
  );
}





// import { useState } from "react";

// import {
//   Box,
//   Button,
//   Checkbox,
//   Divider,
//   FormControlLabel,
//   Paper,
//   Stack,
//   Switch,
//   Typography,
// } from "@mui/material";

// import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
// import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
// import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
// import SaveOutlinedIcon from "@mui/icons-material/SaveOutlined";

// export default function NotificationSettings() {
//   const [notifications, setNotifications] =
//     useState({
//       system: true,
//       email: true,
//       sms: false,
//       orderUpdates: true,
//       inventory: true,
//       marketing: false,
//     });

//   const toggle = (key) => (e) => {
//     setNotifications((prev) => ({
//       ...prev,
//       [key]: e.target.checked,
//     }));
//   };

//   const settingCard = (
//     icon,
//     title,
//     subtitle,
//     key
//   ) => (
//     <Box
//       sx={{
//         border: "1px solid #e5e7eb",
//         borderRadius: 2,
//         p: 2,
//       }}
//     >
//       <Stack
//         direction="row"
//         alignItems="center"
//         justifyContent="space-between"
//       >
//         <Stack
//           direction="row"
//           spacing={2}
//           alignItems="center"
//         >
//           {icon}

//           <Box>
//             <Typography fontWeight={600}>
//               {title}
//             </Typography>

//             <Typography
//               variant="body2"
//               sx={{ color: "#6b7280" }}
//             >
//               {subtitle}
//             </Typography>
//           </Box>
//         </Stack>

//         <Switch
//           checked={notifications[key]}
//           onChange={toggle(key)}
//         />
//       </Stack>
//     </Box>
//   );

//   return (
//     <Paper
//       variant="outlined"
//       sx={{
//         p: 3,
//         borderRadius: 2,
//         borderColor: "#e5e7eb",
//       }}
//     >
//       <Typography
//         variant="h6"
//         sx={{
//           fontWeight: 700,
//         }}
//       >
//         Notification Preferences
//       </Typography>

//       <Typography
//         variant="body2"
//         sx={{
//           color: "#6b7280",
//           mb: 4,
//         }}
//       >
//         Manage how you receive updates
//       </Typography>

//       <Stack spacing={2}>
//         {settingCard(
//           <NotificationsNoneIcon />,
//           "Enable Notifications",
//           "Receive all system notifications",
//           "system"
//         )}

//         {settingCard(
//           <EmailOutlinedIcon />,
//           "Email Notifications",
//           "Get updates via email",
//           "email"
//         )}

//         {settingCard(
//           <SmsOutlinedIcon />,
//           "SMS Notifications",
//           "Get updates via text message",
//           "sms"
//         )}
//       </Stack>

//       <Divider sx={{ my: 4 }} />

//       <Typography
//         sx={{
//           fontWeight: 700,
//           mb: 2,
//         }}
//       >
//         Notification Types
//       </Typography>

//       <Stack>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={notifications.orderUpdates}
//               onChange={toggle("orderUpdates")}
//             />
//           }
//           label="Order updates and status changes"
//         />

//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={notifications.inventory}
//               onChange={toggle("inventory")}
//             />
//           }
//           label="Low stock and inventory alerts"
//         />

//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={notifications.marketing}
//               onChange={toggle("marketing")}
//             />
//           }
//           label="Marketing and promotional emails"
//         />
//       </Stack>

//       <Divider sx={{ my: 4 }} />

//       <Stack
//         direction="row"
//         spacing={1.5}
//         sx={{
//           justifyContent: "flex-end",
//         }}
//       >
//         <Button
//           variant="outlined"
//           sx={{
//             textTransform: "none",
//             color: "#111827",
//             borderColor: "#e5e7eb",
//           }}
//         >
//           Cancel
//         </Button>

//         <Button
//           variant="contained"
//           startIcon={<SaveOutlinedIcon />}
//           sx={{
//             textTransform: "none",
//             bgcolor: "#030521",
//           }}
//         >
//           Save Changes
//         </Button>
//       </Stack>
//     </Paper>
//   );
// }