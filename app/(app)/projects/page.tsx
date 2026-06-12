import { PageHeader } from "@/components/common/PageHeader";
import { EmptyState } from "@/components/common/EmptyState";

export default function ProjectsPage() {
  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Monitor active projects and milestones."
      />
      <EmptyState
        icon="projects"
        title="Projects coming soon"
        body="Project tracker with time logs and milestones is being built."
      />
    </div>
  );
}
