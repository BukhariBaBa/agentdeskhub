export type SelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: readonly string[];
};
