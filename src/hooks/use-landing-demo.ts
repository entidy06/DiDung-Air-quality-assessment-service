"use client";

import { useEffect, useState } from "react";
import {
  airExamples,
  chartExamples,
  type AirScenario,
  type ChartPeriod,
} from "@/lib/landing-demo";

export function useAirDemo() {
  const [scenario, setScenario] = useState<AirScenario>("good");
  return { scenario, example: airExamples[scenario], setScenario };
}

export function useTrendDemo() {
  const [period, setPeriod] = useState<ChartPeriod>("forecast");
  return { period, chart: chartExamples[period], setPeriod };
}

export function useThresholdDemo() {
  const [threshold, setThreshold] = useState(100);
  return {
    threshold,
    setThreshold,
    notificationCopy: `Ví dụ AQI ${threshold + 10}, ngưỡng cá nhân ${threshold}.`,
  };
}

/** UI-only reading position; no domain logic or data access. */
export function useStoryChapter() {
  const [activeChapter, setActiveChapter] = useState<string>();

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveChapter(entry.target.id);
        }
      },
      { rootMargin: "-15% 0px -55% 0px", threshold: 0 },
    );

    document.querySelectorAll(".chapter").forEach((chapter) => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  return activeChapter;
}
