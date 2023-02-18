import React from "react";

import { z } from "zod";

import { openWeatherMapAlert } from "../api/openweathermap.api.zodios";
import { dtFormatDayDayLongWNum, dtFormatFullWTimezone } from "../utils";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";

type Props = {
  alertsData: z.infer<typeof openWeatherMapAlert>[];
  locationTimezone: string;
};

function ForecastAlerts({ alertsData, locationTimezone }: Props) {
  const dtFormat = dtFormatFullWTimezone(locationTimezone);
  return (
    <ForecastSection className="my-4" title="Alerts">
      {alertsData.map((item) => (
        <section
          key={crypto.randomUUID()}
          className="my-2 bg-white bg-opacity-20 p-2 text-white hover:bg-opacity-40"
        >
          <h3 className="text-xl font-medium">{item.event}</h3>
          <p className="text-sm opacity-60">{item.sender_name}</p>
          <p className="text-sm opacity-60">
            <DisplayDt dt={item.start * 1000} dtFormat={dtFormat} />
            <span> to </span>
            <DisplayDt dt={item.end * 1000} dtFormat={dtFormat} />
          </p>
          <p className="mt-1">{item.description}</p>
        </section>
      ))}
    </ForecastSection>
  );
}

export default ForecastAlerts;
