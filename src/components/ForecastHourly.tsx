import { z } from "zod";

import { openWeatherMapHourly } from "../api/openweathermap.api.zodios";
import { dtFormatHHMM } from "../utils";
import Card from "./Card";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";
import TempUnit from "./TempUnit";

type Props = {
  hourlyData: z.infer<typeof openWeatherMapHourly>[];
};

function ForecastHourly({ hourlyData }: Props) {
  return (
    <ForecastSection className="my-4 px-1 text-white" title="Hourly">
      <div className="my-2 flex flex-row overflow-scroll overflow-x-auto overflow-y-hidden">
        {hourlyData.map((item) => (
          <Card key={item.dt}>
            <div className="flex flex-col items-center justify-center">
              <DisplayDt dt={item.dt * 1000} dtFormat={dtFormatHHMM} />
              <span>ICON</span>
              <span className="text-center capitalize">
                {item.weather[0].description}
              </span>
              <div>
                <span>{item.temp}</span>
                <TempUnit className="inline-block" />
              </div>
              <div className="opacity-60">
                <span>{item.feels_like}</span>
                <TempUnit className="inline-block" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ForecastSection>
  );
}

export default ForecastHourly;
