import { useEffect } from "react";

import { useNavigate } from "react-router-dom";

import { motion } from "framer-motion";
import { useAtomValue, useSetAtom } from "jotai";

import { geosearchApi } from "../api/geosearch.api.zodios";
import { openWeatherMapApi } from "../api/openweathermap.api.zodios";
import ForecastAlerts from "../components/ForecastAlerts";
import ForecastDaily from "../components/ForecastDaily";
import ForecastDayDetails from "../components/ForecastDayDetails";
import ForecastHead from "../components/ForecastHead";
import ForecastHourly from "../components/ForecastHourly";
import { forecastBackgroundAtom } from "../state/app.state";
import { selectedLocationAtom, tempUnitAtom } from "../state/app.state";
import { getBackgroundImage } from "../utils";
import SpinnerPage from "./SpinnerPage";

function Forecast() {
  const navigate = useNavigate();
  const setForecastBackground = useSetAtom(forecastBackgroundAtom);
  const selectedLocation = useAtomValue(selectedLocationAtom);
  const tempUnit = useAtomValue(tempUnitAtom);

  useEffect(() => {
    if (!selectedLocation) {
      navigate("/");
    }
  }, [selectedLocation]);

  const forecastQuery = openWeatherMapApi.useGetOneCallForecast(
    {
      queries: {
        lat: selectedLocation?.lat,
        lon: selectedLocation?.lng,
        units: tempUnit,
        appid: import.meta.env.VITE_OWM_APPID,
      },
    },
    {
      enabled: selectedLocation !== null,
      onSuccess: (data) =>
        setForecastBackground(getBackgroundImage(data.current.weather[0].icon)),
    }
  );

  const revGeosearchQuery = geosearchApi.useGetGeosearchReverse({
    queries: {
      lat: selectedLocation?.lat,
      lon: selectedLocation?.lng,
      addressdetails: 0,
      format: "jsonv2",
      zoom: 18,
    },
  });

  if (forecastQuery.error) {
    return (
      <section className="mx-4 text-center text-white">
        <h1>{forecastQuery.error.message}</h1>
      </section>
    );
  }

  return (
    <section>
      {forecastQuery.data && !revGeosearchQuery.isFetching ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-screen-2xl bg-black bg-opacity-30 px-4 shadow-[0_0_40px_40px_rgba(0,0,0,0.3)]"
        >
          <ForecastHead
            locationName={
              revGeosearchQuery.data
                ? revGeosearchQuery.data.display_name
                : "Unknown"
            }
            forecastCurrent={forecastQuery.data.current}
            fetchTime={forecastQuery.data.current.dt}
            locationTimezone={forecastQuery.data.timezone}
          />
          {forecastQuery.data.alerts ? (
            <ForecastAlerts
              alertsData={forecastQuery.data.alerts}
              locationTimezone={forecastQuery.data.timezone}
            />
          ) : null}
          <ForecastDaily dailyData={forecastQuery.data.daily} />
          <ForecastHourly hourlyData={forecastQuery.data.hourly} />
          <ForecastDayDetails
            dailyData={forecastQuery.data.daily}
            locationTimezone={forecastQuery.data.timezone}
          />
        </motion.div>
      ) : (
        <motion.div
          key="spinner-page"
          initial={{ opacity: 0.2 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        >
          <SpinnerPage />
        </motion.div>
      )}
    </section>
  );
}

export default Forecast;
