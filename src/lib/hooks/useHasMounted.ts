"use client";

import { useEffect, useState } from "react";

/** Guards client-only rendering (e.g. theme, persisted state) to avoid a
 * hydration mismatch between server and browser. */
export function useHasMounted(): boolean {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
