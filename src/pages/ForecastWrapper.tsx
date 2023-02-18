import { lazy } from "react";

import { useAtomValue } from "jotai";

import { forecastBackgroundAtom } from "../state/app.state";

const Forecast = lazy(() => import("./Forecast"));

function ForecastWrapper() {
  const forecastBackground = useAtomValue(forecastBackgroundAtom);

  return (
    <main
      style={
        forecastBackground
          ? { backgroundImage: `url(${forecastBackground})` }
          : {}
      }
      className="fixed h-full w-full overflow-y-auto bg-cover bg-center bg-no-repeat"
    >
      <Forecast />
    </main>
  );
}

export default ForecastWrapper;
