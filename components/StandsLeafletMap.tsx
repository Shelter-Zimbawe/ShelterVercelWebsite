"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";

export interface MapLocation {
  id: string;
  name: string;
  area: string;
  note: string;
  lat: number;
  lng: number;
}

function pinIcon(active: boolean) {
  const size = active ? 42 : 32;
  return L.divIcon({
    className: "shelter-leaflet-pin",
    html: `
      <span class="shelter-pin-wrap" style="width:${size}px;height:${size}px;">
        <span class="shelter-pin-pulse${active ? " shelter-pin-pulse-active" : ""}"></span>
        <span class="shelter-pin-dot${active ? " shelter-pin-dot-active" : ""}"></span>
      </span>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function whatsappLink(loc: MapLocation) {
  const message = `How are you Shelter , I wanted to inquire on ${loc.name} in ${loc.area}.`;
  return `https://wa.me/263719551234?text=${encodeURIComponent(message)}`;
}

function directionsLink(loc: MapLocation) {
  return `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;
}

function MapController({
  activeId,
  locations,
  markerRefs,
}: {
  activeId: string | null;
  locations: MapLocation[];
  markerRefs: React.MutableRefObject<Record<string, L.Marker | null>>;
}) {
  const map = useMap();

  useEffect(() => {
    if (!activeId) return;
    const loc = locations.find((l) => l.id === activeId);
    if (!loc) return;
    map.flyTo([loc.lat, loc.lng], 12.5, { duration: 1.1 });
    const marker = markerRefs.current[activeId];
    const t = setTimeout(() => marker?.openPopup(), 450);
    return () => clearTimeout(t);
  }, [activeId, locations, map, markerRefs]);

  return null;
}

interface StandsLeafletMapProps {
  locations: MapLocation[];
  activeId: string | null;
  onSelect: (id: string) => void;
}

export default function StandsLeafletMap({ locations, activeId, onSelect }: StandsLeafletMapProps) {
  const markerRefs = useRef<Record<string, L.Marker | null>>({});
  const center: [number, number] = [-17.98, 31.27];

  return (
    <MapContainer
      center={center}
      zoom={9}
      scrollWheelZoom={false}
      className="h-full w-full"
      style={{ minHeight: 420, background: "#eaf3fb" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapController activeId={activeId} locations={locations} markerRefs={markerRefs} />
      {locations.map((loc) => (
        <Marker
          key={loc.id}
          position={[loc.lat, loc.lng]}
          icon={pinIcon(activeId === loc.id)}
          ref={(ref) => {
            markerRefs.current[loc.id] = ref;
          }}
          eventHandlers={{ click: () => onSelect(loc.id) }}
        >
          <Popup>
            <div className="min-w-[200px]">
              <p className="text-sm font-bold text-gray-900">{loc.name}</p>
              <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide" style={{ color: "#00aeed" }}>
                {loc.area}
              </p>
              <p className="mb-2.5 text-xs leading-relaxed text-gray-600">{loc.note}</p>
              <div className="flex flex-wrap gap-1.5">
                <a
                  href={whatsappLink(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md px-2.5 py-1.5 text-[11px] font-semibold text-white"
                  style={{ background: "linear-gradient(135deg,#25D366,#128C7E)" }}
                >
                  WhatsApp Inquiry
                </a>
                <a
                  href={directionsLink(loc)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 rounded-md border px-2.5 py-1.5 text-[11px] font-semibold"
                  style={{ color: "#2652a2", borderColor: "rgba(38,82,162,0.3)" }}
                >
                  Directions
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
