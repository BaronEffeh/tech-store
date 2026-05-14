import { useState } from "react";

import {
  Grid,
  Box,
} from "@mui/material";

import SettingsHeader from "../components/settings/SettingsHeader";
import SettingsSidebar from "../components/settings/SettingsSidebar";
import SettingsContent from "../components/settings/SettingsContent";
// import SettingsSidebar from "./SettingsSidebar";
// import SettingsContent from "./SettingsContent";

export default function SettingsPanel() {
  const [activeTab, setActiveTab] =
    useState("profile");

  return (
    <Box>
      <SettingsHeader />

    <Grid container spacing={3}>      
      <Grid item xs={12} md={3}>
        <SettingsSidebar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />
      </Grid>

      <Grid item xs={12} md={9}>
        <SettingsContent activeTab={activeTab} />
      </Grid>
    </Grid>
    </Box>
  );
}





// import { Box, Stack } from "@mui/material";

// import SettingsHeader from "../components/settings/SettingsHeader";
// import SettingsPanel from "../components/settings/SettingsPanel";

// export default function SettingsPage() {
//   return (
//     <Box>
//       <Stack spacing={3}>
//         <SettingsHeader />
//         <SettingsPanel />
//       </Stack>
//     </Box>
//   );
// }