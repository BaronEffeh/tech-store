import ProfileSettings from "./ProfileSettings";
import BusinessSettings from "./BusinessSettings";
import NotificationSettings from "./NotificationSettings";
import SecuritySettings from "./SecuritySettings";
import AppearanceSettings from "./AppearanceSettings";
import IntegrationsSettings from "./IntegrationsSettings";
import BillingSettings from "./BillingSettings";

export default function SettingsContent({
  activeTab,
}) {
  switch (activeTab) {
    case "profile":
      return <ProfileSettings />;

    case "business":
      return <BusinessSettings />;

    case "notifications":
      return <NotificationSettings />;

    case "security":
      return <SecuritySettings />;

    case "appearance":
      return <AppearanceSettings />;

    case "integrations":
      return (
        <IntegrationsSettings />
      );

    case "billing":
      return <BillingSettings />;

    default:
      return <ProfileSettings />;
  }
}






// import {
//   Paper,
//   Typography,
// } from "@mui/material";

// import ProfileSettings from "./ProfileSettings";
// import BusinessSettings from "./BusinessSettings";
// import NotificationSettings from "./NotificationSettings";
// import SecuritySettings from "./SecuritySettings";

// export default function SettingsContent({
//   activeTab,
// }) {
//   switch (activeTab) {
//     case "profile":
//       return <ProfileSettings />;

//     case "business":
//       return (
//         <BusinessSettings />
//       );

//     case "notifications":
//       return (
//         <NotificationSettings />
//       );

//     case "security":
//       return (
//         <SecuritySettings />
//       );

//     case "appearance":
//       return (
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6">
//             Appearance Settings
//           </Typography>
//         </Paper>
//       );

//     case "integrations":
//       return (
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6">
//             Integration Settings
//           </Typography>
//         </Paper>
//       );

//     case "billing":
//       return (
//         <Paper sx={{ p: 3 }}>
//           <Typography variant="h6">
//             Billing Settings
//           </Typography>
//         </Paper>
//       );

//     default:
//       return <ProfileSettings />;
//   }
// }