"use client";

import { useState } from "react";

export function useHover() {
  const [hover, setHover] = useState(false);
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
  };
  return [hover, handlers] as const;
}
