"use client";

import { useEffect } from "react";

export default function PageAnalytics() {
  useEffect(() => {
    try {
      if (!sessionStorage.getItem("visit-tracked")) {
        fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ event: "page_visit" }),
        }).catch(() => {});
        sessionStorage.setItem("visit-tracked", "1");
      }
    } catch {
      // sessionStorage unavailable
    }
  }, []);

  return null;
}
