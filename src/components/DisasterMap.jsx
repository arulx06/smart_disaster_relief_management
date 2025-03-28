import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl, useMap } from "react-leaflet";
import ReactDOMServer from "react-dom/server";
import { CgMediaLive } from "react-icons/cg";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./DisasterMap.css";

// Fix default icon issue in Leaflet
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const defaultIcon = new L.Icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [30, 40],
  iconAnchor: [15, 40],
  popupAnchor: [0, -35],
});

// Custom control for toggle button
const ToggleButtonControl = ({ showEarthquakeMap, setShowEarthquakeMap }) => {
  const map = useMap();

  useEffect(() => {
    const control = L.control({ position: "topleft" });

    control.onAdd = () => {
      const button = L.DomUtil.create("button", "toggle-map-btn");
      button.innerHTML = ReactDOMServer.renderToString(<CgMediaLive size={24} color="red" />);
      button.style.cssText = `
        background: white;
        border: none;
        cursor: pointer;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.2);
      `;

      button.onclick = () => setShowEarthquakeMap((prev) => !prev);
      return button;
    };

    control.addTo(map);
    return () => control.remove();
  }, [map, showEarthquakeMap, setShowEarthquakeMap]);

  return null;
};

const DisasterMap = () => {
  const [disasters, setDisasters] = useState([]);
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEarthquakeMap, setShowEarthquakeMap] = useState(false);

  useEffect(() => {
    const fetchDisasters = async () => {
      try {
        const response = await fetch("http://localhost:3001/api/disasters/all");
        if (!response.ok) throw new Error("Failed to fetch disaster data");
        const data = await response.json();
        setDisasters(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchEarthquakes = async () => {
      try {
        const response = await fetch("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
        if (!response.ok) throw new Error("Failed to fetch earthquake data");
        const data = await response.json();
        const earthquakeData = data.features.map((quake) => ({
          id: quake.id,
          latitude: quake.geometry.coordinates[1],
          longitude: quake.geometry.coordinates[0],
          magnitude: quake.properties.mag,
          place: quake.properties.place,
          time: new Date(quake.properties.time).toLocaleString(),
        }));
        setEarthquakes(earthquakeData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDisasters();
    fetchEarthquakes();
  }, []);

  if (loading) return <p>Loading map...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[20, 0]}
        zoom={3}
        style={{ height: "500px", width: "100%", borderRadius: "20px" }}
        maxBounds={[[-85, -180], [85, 180]]}
        maxBoundsViscosity={1.0}
        zoomControl={true}
      >
        {/* Toggle Button Inside Map */}
        <ToggleButtonControl showEarthquakeMap={showEarthquakeMap} setShowEarthquakeMap={setShowEarthquakeMap} />

        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Default View">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite View">
            <TileLayer
              attribution="&copy; Google Maps"
              url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Terrain View">
            <TileLayer
              attribution="&copy; Google Maps"
              url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {!showEarthquakeMap
          ? disasters.map((disaster) => (
              <Marker key={disaster.disno} position={[disaster.latitude, disaster.longitude]} icon={defaultIcon}>
                <Popup>
                  <strong>🌪️ Disaster No:</strong> {disaster.disno} <br />
                  <strong>📍 Location:</strong> {disaster.location_ || "Unknown"} <br />
                  <strong>🌎 Country:</strong> {disaster.country || "N/A"} <br />
                  <strong>📅 Date:</strong> {disaster.date || "Unknown"} <br />
                  <strong>⚠️ Severity:</strong> {disaster.severity || "N/A"}
                </Popup>
              </Marker>
            ))
          : earthquakes.map((quake) => (
              <Marker key={quake.id} position={[quake.latitude, quake.longitude]} icon={defaultIcon}>
                <Popup>
                  <strong>📍 Location:</strong> {quake.place} <br />
                  <strong>⚡ Magnitude:</strong> {quake.magnitude} <br />
                  <strong>🕒 Time:</strong> {quake.time} <br />
                </Popup>
              </Marker>
            ))}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;
