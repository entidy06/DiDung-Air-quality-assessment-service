"use client";
import { useEffect, useRef } from "react";

/** Keep fragment offsets in sync with the actual responsive navbar height. */
export function useStickyHeader() {
  const headerRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const header = headerRef.current;
    if (!header) return;
    const root = document.documentElement;
    const measure = () => root.style.setProperty("--site-header-height", `${Math.ceil(header.getBoundingClientRect().height)}px`);
    measure();
    const observer = typeof ResizeObserver === "undefined" ? null : new ResizeObserver(measure);
    observer?.observe(header);
    window.addEventListener("resize", measure);
    return () => {
      observer?.disconnect();
      window.removeEventListener("resize", measure);
      root.style.removeProperty("--site-header-height");
    };
  }, []);
  return headerRef;
}
