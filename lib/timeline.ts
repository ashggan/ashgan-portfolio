export const AXIS_START = new Date(2019, 0, 1).getTime();
export const AXIS_END = new Date(2026, 11, 31).getTime();

export function pctOf(ms: number): string {
  const p = (ms - AXIS_START) / (AXIS_END - AXIS_START);
  return (Math.max(0, Math.min(100, p * 100))).toFixed(2);
}

export function axisYears(): { label: string; left: string }[] {
  const out: { label: string; left: string }[] = [];
  for (let y = 2019; y <= 2026; y++) {
    out.push({ label: "'" + String(y).slice(2), left: pctOf(new Date(y, 0, 1).getTime()) + "%" });
  }
  return out;
}
