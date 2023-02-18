import { useSetAtom } from "jotai";
import { z } from "zod";

import { openWeatherMapDaily } from "../api/openweathermap.api.zodios";
import { selectedDayAtom } from "../state/app.state";
import { dtFormatDayShortWNum } from "../utils";
import Card from "./Card";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";
import TempUnit from "./TempUnit";

type Props = {
  dailyData: z.infer<typeof openWeatherMapDaily>[];
};

function ForecastDaily({ dailyData }: Props) {
  const setSelectedDay = useSetAtom(selectedDayAtom);
  return (
    <ForecastSection className="my-4 px-1 text-white" title="Daily">
      <div className="my-2 flex flex-row overflow-scroll overflow-x-auto overflow-y-hidden text-white">
        {dailyData.map((item, i) => (
          <Card
            onClick={() => setSelectedDay(i)}
            key={item.dt}
            extraClassName="cursor-pointer"
          >
            <div className="flex flex-col items-center justify-center">
              <DisplayDt dt={item.dt * 1000} dtFormat={dtFormatDayShortWNum} />
              <span>ICON</span>
              <span className="text-center capitalize">
                {item.weather[0].description}
              </span>
              <div>
                <span>{item.temp.day}</span>
                <TempUnit className="inline-block" />
              </div>
              <div className="opacity-60">
                <span>{item.feels_like.day}</span>
                <TempUnit className="inline-block" />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </ForecastSection>
  );
}

export default ForecastDaily;
