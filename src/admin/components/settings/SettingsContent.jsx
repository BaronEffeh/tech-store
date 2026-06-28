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
