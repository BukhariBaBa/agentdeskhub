import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function ProposalsPage() {
  return (
    <div>
      <PageHeader
        title="Proposals"
        subtitle="Track and manage your proposals."
      />
      <EmptyState
        icon="proposals"
        title="Proposals coming soon"
        body="AI-generated proposals with approval workflow is being built."
      />
    </div>
  );
}
