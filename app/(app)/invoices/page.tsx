import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function InvoicesPage() {
  return (
    <div>
      <PageHeader title="Invoices" subtitle="Send and track client invoices." />
      <EmptyState
        icon="invoices"
        title="Invoices coming soon"
        body="Automated invoicing and payment tracking is being built."
      />
    </div>
  );
}
