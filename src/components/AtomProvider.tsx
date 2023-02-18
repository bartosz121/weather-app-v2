import { useParams } from "react-router-dom";

import { Provider, useAtomValue } from "jotai";
import { LatLng } from "leaflet";

import ForecastWrapper from "../pages/ForecastWrapper";
import { selectedLocationAtom } from "../state/app.state";

function AtomProvider() {
  const { latlon } = useParams();
  const selectedLocation = useAtomValue(selectedLocationAtom);
  console.log(latlon);

  return (
    <Provider
      initialValues={[
        [
          selectedLocationAtom,
          selectedLocation ? selectedLocation : parseUrlLatLng(latlon!),
        ],
      ]}
    >
      <ForecastWrapper />
    </Provider>
  );
}

export default AtomProvider;

function parseUrlLatLng(latLng: string): LatLng | null {
  console.log(latLng);
  const split = latLng.split(",");
  if (split.length !== 2) {
    return null;
  }
  const lat = Number(split[0]);
  const lng = Number(split[1]);

  if (isNaN(lat) || isNaN(lng)) {
    return null;
  }

  if (
    !(
      isFinite(lat) &&
      Math.abs(lat) <= 90 &&
      isFinite(lng) &&
      Math.abs(lng) <= 180
    )
  ) {
    return null;
  }
  const position = new LatLng(lat, lng);
  return position;
}
