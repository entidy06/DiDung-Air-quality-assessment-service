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
  const [numbers, setNumbers] = useState({ aqi: 42, pm: 10 });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setNumbers({
      aqi: scenario === "bad" ? 151 + Math.floor(Math.random() * 50) : 25 + Math.floor(Math.random() * 26),
      pm: scenario === "bad" ? 70 + Math.floor(Math.random() * 46) : 7 + Math.floor(Math.random() * 12),
    }), 4000);
    return () => window.clearInterval(timer);
  }, [scenario]);
  const changeScenario = (next: AirScenario) => {
    setScenario(next);
    setNumbers(next === "bad" ? { aqi: 176, pm: 105 } : { aqi: 42, pm: 10 });
  };
  return { scenario, example: {
    ...airExamples[scenario],
    aqi: scenario === "missing" ? "—" : String(numbers.aqi),
    pm: scenario === "missing" ? "Chưa có dữ liệu" : `${numbers.pm} µg/m³`,
  }, setScenario: changeScenario };
}

export function useTrendDemo() {
  const [period, setPeriod] = useState<ChartPeriod>("forecast");
  type DemoChart = { path: string; area: string; title: string; caption: string; description: string; dotY: number; dash: string };
  const [charts, setCharts] = useState<Record<ChartPeriod, DemoChart>>({ ...chartExamples });
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => {
      const values = Array.from({ length: 6 }, () => 30 + Math.floor(Math.random() * 65));
      const xs = [48, 151, 254, 357, 460, 563];
      const ys = values.map(value => Math.round(165 - value * 1.2));
      const path = xs.map((x, index) => `${index ? "L" : "M"}${x} ${ys[index]}`).join(" ");
      setCharts(current => ({ ...current, [period]: {
        ...chartExamples[period], path, area: `${path}V165H48Z`, dotY: ys[5],
        caption: `Minh họa US AQI: ${values.join(" → ")}. Không phải dữ liệu hiện tại.`,
        description: `Đường ${period === "forecast" ? "dự báo" : "lịch sử"} minh họa với các giá trị ${values.join(", ")}. Không phải dữ liệu thực tế.`,
      } }));
    }, 4000);
    return () => window.clearInterval(timer);
  }, [period]);
  return { period, chart: charts[period], setPeriod };
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

const initialIllustration = {
  aqi: 72,
  humidity: 76,
  rain: 35,
  wind: 8,
  uv: 4,
};

/** Illustrative values for the public story. Never reads a live API. */
export function useIllustrativeMetrics() {
  const [values, setValues] = useState(initialIllustration);
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    const update = () => setValues({
      aqi: 55 + Math.floor(Math.random() * 45),
      humidity: 60 + Math.floor(Math.random() * 30),
      rain: 10 + Math.floor(Math.random() * 65),
      wind: 3 + Math.floor(Math.random() * 18),
      uv: 1 + Math.floor(Math.random() * 10),
    });
    const timer = window.setInterval(update, 4000);
    return () => window.clearInterval(timer);
  }, []);
  return values;
}
