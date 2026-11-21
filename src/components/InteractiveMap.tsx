import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { ExternalLink, Navigation } from 'lucide-react';

// Fix default Leaflet marker icons
const defaultIcon = L.divIcon({
  className: 'custom-leaflet-pin',
  html: `<div style="background-color:#0F1A2E;color:#C5A059;width:30px;height:30px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:2.5px solid #C5A059;box-shadow:0 4px 10px rgba(15,26,46,0.35);font-weight:700;font-size:13px;">★</div>`,
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -14],
});

const highlightIcon = L.divIcon({
  className: 'custom-leaflet-pin-highlight',
  html: `<div style="background-color:#C5A059;color:#0F1A2E;width:34px;height:34px;border-radius:50%;display:flex;align-items:center;justify-content:center;border:3px solid #0F1A2E;box-shadow:0 4px 12px rgba(15,26,46,0.45);font-weight:800;font-size:15px;">⌂</div>`,
  iconSize: [34, 34],
  iconAnchor: [17, 17],
  popupAnchor: [0, -16],
});

export interface InteractiveMarker {
  id: string;
  name: string;
  subtitle?: string;
  description?: string;
  lat: number;
  lng: number;
  isBase?: boolean;
}

interface InteractiveMapProps {
  center: [number, number];
  zoom?: number;
  markers: InteractiveMarker[];
  drawRouteLine?: boolean;
  height?: string;
}

const RecenterAutomatically: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center[0], center[1], zoom, map]);
  return null;
};

export const InteractiveMap: React.FC<InteractiveMapProps> = ({
  center,
  zoom = 13,
  markers,
  drawRouteLine = false,
  height = '380px',
}) => {
  const polylinePositions: [number, number][] = drawRouteLine
    ? markers.map((m) => [m.lat, m.lng])
    : [];

  return (
    <div className="relative rounded-2xl overflow-hidden border border-sand-200 shadow-editorial bg-sand-100">
      <div style={{ height, width: '100%' }}>
        <MapContainer
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          style={{ height: '100%', width: '100%' }}
        >
          <RecenterAutomatically center={center} zoom={zoom} />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {drawRouteLine && polylinePositions.length > 1 && (
            <Polyline
              positions={polylinePositions}
              pathOptions={{ color: '#0F1A2E', weight: 3, dashArray: '8, 8', opacity: 0.8 }}
            />
          )}
          {markers.map((m) => (
            <Marker
              key={m.id}
              position={[m.lat, m.lng]}
              icon={m.isBase ? highlightIcon : defaultIcon}
            >
              <Popup>
                <div className="p-1 max-w-xs">
                  <p className="font-serif font-bold text-navy-900 text-sm mb-0.5">{m.name}</p>
                  {m.subtitle && (
                    <p className="text-xs font-semibold text-gold-700 mb-1">{m.subtitle}</p>
                  )}
                  {m.description && (
                    <p className="text-xs text-navy-700 mb-2 leading-relaxed">{m.description}</p>
                  )}
                  <div className="flex items-center gap-2 pt-1 border-t border-sand-200">
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${m.lat},${m.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs font-semibold text-navy-800 hover:text-gold-600"
                    >
                      <Navigation className="w-3 h-3" />
                      Abrir rota no Google Maps
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
    </div>
  );
};
