import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function IntegrationsPage() {
  return (
    <div>
      <PageHeader
        title="Integrations"
        subtitle="Connect your tools and workflows."
      />
      <EmptyState
        icon="link"
        title="Integrations coming soon"
        body="Third-party integrations and webhooks are being built."
      />
    </div>
  );
}
