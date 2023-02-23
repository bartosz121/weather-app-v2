import { MapContainer, TileLayer } from "react-leaflet";

import { useAtomValue } from "jotai";

import CheckForecastButton from "../components/CheckForecastButton";
import MapGeoSearch from "../components/MapGeoSearch";
import MapLocation from "../components/MapLocation";
import { selectedLocationAtom } from "../state/app.state";

import "leaflet/dist/leaflet.css";

export default function Map() {
  const selectedLocation = useAtomValue(selectedLocationAtom);

  return (
    <MapContainer
      id="map"
      className="h-screen w-screen"
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
      {selectedLocation ? <CheckForecastButton /> : null}
    </MapContainer>
  );
}
