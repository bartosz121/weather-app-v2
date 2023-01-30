import { MapContainer, TileLayer } from "react-leaflet";

import MapGeoSearch from "../components/MapGeoSearch";
import MapLocation from "../components/MapLocation";

import "leaflet/dist/leaflet.css";

export default function Map(): JSX.Element {
  return (
    <MapContainer
      id="map"
      className="w-screen h-screen"
      center={[20, 0]}
      zoom={3}
      minZoom={3}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapLocation />
      <MapGeoSearch />
    </MapContainer>
  );
}
