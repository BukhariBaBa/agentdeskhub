export type PortalStepProps = {
  portalClient: { name: string; company: string };
  portalUrl: string;
  copied: boolean;
  onCopy: () => void;
};
