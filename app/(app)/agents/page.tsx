import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function AgentsPage() {
  return (
    <div>
      <PageHeader
        title="Agents"
        subtitle="Configure and monitor your AI agents."
      />
      <EmptyState
        icon="agents"
        title="Agents coming soon"
        body="Agent configuration and run history is being built."
      />
    </div>
  );
}
