export function hexA(hex: string, alpha: number): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255},${(n >> 8) & 255},${n & 255},${alpha})`;
}

export function kigaliHour(): number {
  return parseInt(
    new Date().toLocaleString("en-GB", { timeZone: "Africa/Kigali", hour: "2-digit", hour12: false }),
    10,
  );
}

export function kigaliClock(): string {
  return new Date().toLocaleTimeString("en-GB", {
    timeZone: "Africa/Kigali",
    hour: "2-digit",
    minute: "2-digit",
  });
}
