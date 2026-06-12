import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function SettingsPage() {
  return (
    <div>
      <PageHeader
        title="Settings"
        subtitle="Manage your workspace and account."
      />
      <EmptyState
        icon="settings"
        title="Settings coming soon"
        body="Workspace settings and billing management is being built."
      />
    </div>
  );
}
