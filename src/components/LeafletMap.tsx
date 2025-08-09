// ──────────────────────────────────────────────
// src/components/LeafletMap.tsx
// ──────────────────────────────────────────────
"use client";                       // ⬅ enable client-side mode for this file

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import type { LatLngExpression } from "leaflet";

export type Store = {
  id: string;
  name: string;
  lat: number;
  lng: number;
};

type Props = { 
  stores: Store[];
  focusedStoreId?: string;
};

// Component to handle map controls
function MapController({ stores, focusedStoreId }: Props) {
  const map = useMap();
  
  useEffect(() => {
    if (focusedStoreId) {
      const store = stores.find(s => s.id === focusedStoreId);
      if (store) {
        // Pan and zoom to the focused location
        map.setView([store.lat, store.lng] as LatLngExpression, 16, {
          animate: true,
          duration: 1
        });
      }
    }
  }, [focusedStoreId, stores, map]);

  return null;
}

export default function LeafletMap({ stores, focusedStoreId }: Props) {
  const [L, setL] = useState<any>(null);
  const [customIcon, setCustomIcon] = useState<any>(null);

  useEffect(() => {
    import("leaflet").then((leaflet) => {
      setL(leaflet);
      setCustomIcon(
        new leaflet.Icon({
          iconUrl: "/cooplogo.png",
          iconSize: [60, 60],
          iconAnchor: [30, 60],
          popupAnchor: [0, -60],
          className: "custom-leaflet-marker",
        })
      );
    });
  }, []);

  if (!L || !customIcon) return null;

  // Determine map height based on whether a location is focused
  const mapHeight = focusedStoreId ? 500 : 300;

  return (
    <MapContainer
      key={`main-map-${stores.length}-${focusedStoreId ?? 'none'}`}
      center={[32.2226, -110.9747] as LatLngExpression} // Tucson
      zoom={12}
      scrollWheelZoom={false}
      style={{ height: mapHeight, width: "100%", borderRadius: 8, zIndex: 10 }}
      className="transition-all duration-500 ease-in-out"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a>'
      />

      {/* Map controller for handling focused location */}
      <MapController stores={stores} focusedStoreId={focusedStoreId} />

      {/* permanent store pins */}
      {stores.map((s) => (
        <Marker key={s.id} position={[s.lat, s.lng] as LatLngExpression} icon={customIcon}>
          <Popup>
            <strong>{s.name}</strong>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}