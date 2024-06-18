import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const Map = ({ center, destination }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (center && center.length === 2 && mapRef.current) {
      mapRef.current.setView(center);
    }
  }, [center]);

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "80vh", width: "100%" }}
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={center}>
        <Popup>{destination}</Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
