import { FieldLabel } from "@/components/common/FieldLabel";
import { TextInput } from "@/components/common/TextInput";
import type { WorkspaceStepProps } from "./WorkspaceStep.types";
import {
  WORKSPACE_STEP_EYEBROW,
  WORKSPACE_STEP_TITLE,
  WORKSPACE_STEP_SUB,
} from "./WorkspaceStep.const";
import { StepShell } from "./StepShell";

export function WorkspaceStep({ wsName, onChangeName }: WorkspaceStepProps) {
  return (
    <StepShell
      eyebrow={WORKSPACE_STEP_EYEBROW}
      title={WORKSPACE_STEP_TITLE}
      sub={WORKSPACE_STEP_SUB}
    >
      <div className="mb-[18px]">
        <FieldLabel>Workspace name</FieldLabel>
        <TextInput
          value={wsName}
          onChange={onChangeName}
          placeholder="Rivera Studio"
        />
      </div>
    </StepShell>
  );
}
