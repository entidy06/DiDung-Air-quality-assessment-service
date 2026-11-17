"use client";
import { useState } from "react";
import { MapPanel } from "../live/map-panel";
export function MapPreview({ expanded = false }: { expanded?: boolean }) {
  const [open, setOpen] = useState(expanded);
  return <details id="map-preview" className="map-details" open={open} onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>
      <span aria-hidden="true">⌖</span> Cùng nhìn rộng hơn một chút <span aria-hidden="true">+</span>
    </summary>{open && <MapPanel />}</details>;
}
