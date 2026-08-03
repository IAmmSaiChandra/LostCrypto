"use client";

import { useRouteTracker } from "@/src/hooks/useLastValidRoute";

export function RouteTracker() {
  useRouteTracker();
  return null;
}
