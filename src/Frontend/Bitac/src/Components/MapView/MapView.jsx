// src/Components/MapView/MapView.jsx
import React from "react";
import PropTypes from "prop-types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css"; 
import "./MapView.css";

const MapView = ({ locations }) => {
  if (locations.length === 0) {
    return (
      <div className="map-container">
        <h3>Ubicaciones de los logs</h3>
        <p>No hay ubicaciones para mostrar.</p>
      </div>
    );
  }

  const parseLocation = (location) => {
    const [lat, lng] = location.split(",").map(Number);
    return { lat, lng };
  };

  const initialPosition = parseLocation(locations[0]);

  return (
    <div className="map-container">
      <h3>Ubicaciones de los logs</h3>
      <MapContainer
        center={initialPosition}
        zoom={6}
        style={{ width: "100%", height: "400px" }}
        scrollWheelZoom={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />

        {locations.map((location, index) => {
          const { lat, lng } = parseLocation(location);
          return (
            <Marker key={index} position={{ lat, lng }}>
              <Popup>
                <span>Ubicación {index + 1}: {lat.toFixed(2)}, {lng.toFixed(2)}</span>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

MapView.propTypes = {
  locations: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MapView;