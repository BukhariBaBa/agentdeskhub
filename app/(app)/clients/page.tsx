import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function ClientsPage() {
  return (
    <div>
      <PageHeader
        title="Clients"
        subtitle="Manage your client relationships."
      />
      <EmptyState
        icon="clients"
        title="Clients coming soon"
        body="Full clients list with filtering and CRM features is being built."
      />
    </div>
  );
}
