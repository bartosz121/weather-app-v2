import React from "react";

import { useAtomValue } from "jotai";
import { z } from "zod";

import { openWeatherMapDaily } from "../api/openweathermap.api.zodios";
import { selectedDayAtom } from "../state/app.state";
import { dtFormatDayDayLongWNum } from "../utils";
import CircularDayInfoSection from "./CircularDayInfoSection";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";
import GeneralDayInfoSection from "./GeneralDayInfoSection";
import MoonDayInfoSection from "./MoonDayInfoSection";
import SunDayInfoSection from "./SunDayInfoSection";

type Props = {
  dailyData: z.infer<typeof openWeatherMapDaily>[];
  locationTimezone: string;
};

function ForecastDayDetails({ dailyData, locationTimezone }: Props) {
  const selectedDay = useAtomValue(selectedDayAtom);

  return (
    <ForecastSection
      className="my-4 px-1 text-white"
      // FIXME wtf
      //@ts-ignore
      title={
        <div>
          <span>Day Details - </span>
          <DisplayDt
            dt={dailyData[selectedDay].dt * 1000}
            dtFormat={dtFormatDayDayLongWNum}
          />
        </div>
      }
    >
      <section className="flex flex-row flex-wrap gap-16 py-4 px-2 md:px-4">
        <GeneralDayInfoSection
          className="shrink-0 grow basis-12"
          dailyData={dailyData[selectedDay]}
        />
        <SunDayInfoSection
          className="shrink-0 grow basis-12"
          sunRise={dailyData[selectedDay].sunrise * 1000}
          sunSet={dailyData[selectedDay].sunset * 1000}
          locationTimezone={locationTimezone}
        />
        <MoonDayInfoSection
          className="shrink-0 grow basis-12"
          moonRise={dailyData[selectedDay].moonrise * 1000}
          moonSet={dailyData[selectedDay].moonset * 1000}
          moonPhase={dailyData[selectedDay].moon_phase}
          locationTimezone={locationTimezone}
        />
        <CircularDayInfoSection
          className="shrink-0 grow basis-12"
          precipitation={dailyData[selectedDay].pop}
          humidity={dailyData[selectedDay].humidity}
          uvIndex={dailyData[selectedDay].uvi}
          pressure={dailyData[selectedDay].pressure}
        />
      </section>
    </ForecastSection>
  );
}

export default ForecastDayDetails;
