export type TextInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: "text" | "email" | "password" | "number";
  prefix?: string;
  suffix?: string;
  mono?: boolean;
  disabled?: boolean;
};
