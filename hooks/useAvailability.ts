"use client";

import { useEffect, useState } from "react";
import { kigaliHour } from "@/lib/utils";
import { WORK_HOURS } from "@/data/chat";

export interface Availability {
  text: string;
  dot: string;
  fg: string;
  bd: string;
  pulse: "0" | "1";
}

function compute(): Availability {
  const h = kigaliHour();
  const open = h >= WORK_HOURS.start && h < WORK_HOURS.end;
  return open
    ? { text: "Available now · replies within a day", dot: "#6BD69F", fg: "#F6F4EF", bd: "rgba(107,214,159,0.55)", pulse: "1" }
    : { text: "Outside working hours · replies within a day", dot: "rgba(246,244,239,0.55)", fg: "rgba(246,244,239,0.8)", bd: "rgba(246,244,239,0.35)", pulse: "0" };
}

export function useAvailability(): Availability {
  const [state, setState] = useState<Availability>({
    text: "Available now · replies within a day",
    dot: "#6BD69F",
    fg: "#F6F4EF",
    bd: "rgba(107,214,159,0.55)",
    pulse: "1",
  });

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only clock, unknown at SSR time
    setState(compute());
    const id = setInterval(() => setState(compute()), 60000);
    return () => clearInterval(id);
  }, []);

  return state;
}
