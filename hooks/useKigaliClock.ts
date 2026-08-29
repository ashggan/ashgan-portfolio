"use client";

import { useEffect, useState } from "react";
import { kigaliClock } from "@/lib/utils";

export function useKigaliClock(): string {
  const [clock, setClock] = useState("");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only clock, unknown at SSR time
    setClock(kigaliClock());
    const id = setInterval(() => setClock(kigaliClock()), 1000);
    return () => clearInterval(id);
  }, []);

  return clock || "--:--";
}
