"use client";
import { useEffect } from "react";
import type { MouseEvent } from "react";
import { usePathname } from "next/navigation";

function revealSection(section: string) {
  const element = document.getElementById(section);
  const details = element instanceof HTMLDetailsElement ? element : element?.closest("details");
  if (details) details.open = true;
  return element;
}

export function useLandingAnchor(section: string) {
  const pathname = usePathname();
  return {
    href: pathname === "/" ? `#${section}` : `/#${section}`,
    onClick: (event: MouseEvent<HTMLAnchorElement>) => {
      // Preserve browser behavior for modified clicks and links from other pages.
      if (pathname !== "/" || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const element = revealSection(section);
      if (!element) return;
      event.preventDefault();
      const target = new URL(window.location.href);
      target.hash = section;
      if (target.hash !== window.location.hash) window.history.pushState(null, "", `${target.pathname}${target.search}${target.hash}`);
      // Explicitly scroll even when the fragment has not changed. A location
      // selection only changes data; it must never turn this into a router no-op.
      element.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth", block: "start" });
    },
  };
}

export function useLandingFragment() {
  const pathname = usePathname();
  useEffect(() => {
    if (pathname !== "/") return;
    const reveal = () => {
      try { revealSection(decodeURIComponent(window.location.hash.slice(1))); } catch { /* Ignore malformed fragments. */ }
    };
    reveal();
    window.addEventListener("hashchange", reveal);
    return () => window.removeEventListener("hashchange", reveal);
  }, [pathname]);
}
