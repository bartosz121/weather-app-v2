import { useMemo } from "react";

import { ReactSkycon } from "react-skycons-extended";

import { useAtomValue } from "jotai";
import { z } from "zod";

import { openWeatherMapCurrent as openWeatherMapCurrentSchema } from "../api/openweathermap.api.zodios";
import { tempUnitAtom } from "../state/app.state";
import {
  dtFormatHHMM,
  dtFormatMediumWTimezone,
  getRseIconForOmwIcon,
} from "../utils";
import DisplayDt from "./DisplayDt";
import TempUnit from "./TempUnit";

type openWeatherMapCurrent = z.infer<typeof openWeatherMapCurrentSchema>;

type Props = {
  locationName: string;
  forecastCurrent: openWeatherMapCurrent;
  fetchTime: number;
  locationTimezone: string;
};

function ForecastHead({
  locationName,
  forecastCurrent,
  fetchTime,
  locationTimezone,
}: Props) {
  const dtFormatWTimezone = dtFormatMediumWTimezone(locationTimezone);
  const tempUnitA = useAtomValue(tempUnitAtom);
  const skycon = getRseIconForOmwIcon(forecastCurrent.weather[0].icon);

  const windSpeedDisplay = useMemo(() => {
    switch (tempUnitA) {
      case "metric":
        return `${(forecastCurrent.wind_speed * 3.6).toFixed(2)}km/h`;
      case "imperial":
        return `${forecastCurrent.wind_speed.toFixed(2)}mph`;
    }
  }, [forecastCurrent, tempUnitA]);

  return (
    <section className="flex flex-col items-center gap-1 pt-2 text-white">
      <h2 className="mb-2 text-center text-2xl">{locationName}</h2>
      <div className="flex flex-row items-center gap-3">
        <span>
          <ReactSkycon icon={skycon} size={100} color="white" />
        </span>
        <div className="flex flex-row gap-2 text-7xl">
          {forecastCurrent.temp}
          <TempUnit className="select-none" addOnClickChange />
        </div>
      </div>
      <div className="text-3xl capitalize">
        {forecastCurrent.weather[0].description}
      </div>
      <span className="text-xs opacity-80">
        Updated as of{" "}
        <DisplayDt dt={fetchTime * 1000} dtFormat={dtFormatHHMM} />
      </span>
      <div className="mt-2 flex flex-row flex-wrap justify-center gap-3 text-sm md:w-3/4 md:justify-around">
        <div className="">
          <span className="mr-1">Local time</span>
          <DisplayDt dt={new Date().getTime()} dtFormat={dtFormatWTimezone} />
        </div>
        <div className="">
          Feels like {forecastCurrent.feels_like}
          <TempUnit className="inline-block" />
        </div>
        <div className="">Barometer {forecastCurrent.pressure}hPa</div>
        <div className="">Humidity {forecastCurrent.humidity}%</div>
        <div className="">
          Dew Point {forecastCurrent.dew_point}
          <TempUnit className="inline-block" />
        </div>
        <div className="">Clouds {forecastCurrent.clouds}%</div>
        {forecastCurrent.visibility ? (
          <div className="">
            Visibility {(forecastCurrent.visibility / 1000).toFixed(2)}km
          </div>
        ) : null}
        <div className="shrink-0">Wind {windSpeedDisplay}</div>
      </div>
    </section>
  );
}

export default ForecastHead;
