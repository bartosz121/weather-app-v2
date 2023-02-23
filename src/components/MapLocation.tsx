import { useEffect } from "react";

import { Marker, useMapEvents } from "react-leaflet";

import { useAtom } from "jotai";
import { LatLng, Map } from "leaflet";

import { selectedLocationAtom } from "../state/app.state";

const flyToZoomLevel = 13;
const maxZoomLevelFlyTo = 10;

export default function MapLocation() {
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);

  useEffect(() => {
    if (selectedLocation) {
      flyTo(selectedLocation, map);
    }
  }, [selectedLocation]);

  function flyTo(position: LatLng, map: Map) {
    const currentZoom = map.getZoom();
    map.flyTo(
      position,
      currentZoom > maxZoomLevelFlyTo ? currentZoom : flyToZoomLevel
    );
  }

  const map = useMapEvents({
    click(e) {
      //@ts-ignore
      if (e.originalEvent.target?.id === "map") {
        setSelectedLocation(e.latlng);
      }
    },

    locationfound(e) {
      setSelectedLocation(e.latlng);
    },
  });

  useEffect(() => {
    map.locate();
  }, []);

  return selectedLocation ? <Marker position={selectedLocation} /> : null;
}
