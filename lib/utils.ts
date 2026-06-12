export function money(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

export function fmtDate(s: string): string {
  return s;
}
