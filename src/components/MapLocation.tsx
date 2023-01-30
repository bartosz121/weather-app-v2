import { useEffect, useState } from "react";

import { Marker, useMapEvents } from "react-leaflet";

import { useAtom } from "jotai";
import { LatLng, LeafletMouseEvent, LocationEvent, Map } from "leaflet";

import { selectedLocationAtom } from "../state/app.state";

const flyToZoomLevel = 13;

export default function MapLocation() {
  const [selectedLocation, setSelectedLocation] = useAtom(selectedLocationAtom);

  useEffect(() => {
    if (selectedLocation) {
      flyTo(selectedLocation, map);
    }
  }, [selectedLocation]);

  function flyTo(position: LatLng, map: Map) {
    map.flyTo(position, flyToZoomLevel);
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
