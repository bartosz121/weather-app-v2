import { useNavigate } from "react-router-dom";

import clsx from "clsx";
import { useAtomValue } from "jotai";

import { selectedLocationAtom } from "../state/app.state";

function CheckForecastButton() {
  const navigate = useNavigate();
  const selectedLocation = useAtomValue(selectedLocationAtom);

  function redirectToForecast() {
    navigate(`/${selectedLocation!.lat},${selectedLocation!.lng}`);
  }

  return (
    <div className="leaflet-ctrl absolute left-1/2 bottom-[10%] z-[5000] -translate-x-1/2 -translate-y-1/2">
      <button
        onClick={redirectToForecast}
        className={clsx(
          "cursor-pointer bg-white py-4 px-12 text-lg tracking-wide shadow-lg",
          "border-1 rounded-lg border border-slate-500 border-opacity-50 shadow-lg transition-all hover:bg-gray-200"
        )}
      >
        Check Forecast
      </button>
    </div>
  );
}

export default CheckForecastButton;
