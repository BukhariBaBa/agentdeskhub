export type RedFlag = {
  id: string;
  label: string;
  on: boolean;
};

export type RedFlagRowProps = {
  flag: RedFlag;
  onToggle: () => void;
};
