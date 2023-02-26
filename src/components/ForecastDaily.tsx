import { ReactSkycon } from "react-skycons-extended";

import clsx from "clsx";
import { useAtom } from "jotai";
import { z } from "zod";

import { openWeatherMapDaily } from "../api/openweathermap.api.zodios";
import { selectedDayAtom } from "../state/app.state";
import { dtFormatDayShortWNum, getRseIconForOmwIcon } from "../utils";
import Card from "./Card";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";
import TempUnit from "./TempUnit";

type Props = {
  dailyData: z.infer<typeof openWeatherMapDaily>[];
};

function ForecastDaily({ dailyData }: Props) {
  const [selectedDay, setSelectedDay] = useAtom(selectedDayAtom);
  return (
    <ForecastSection className="my-4 px-1 text-white" title="Daily">
      <div className="my-2 flex flex-row overflow-scroll overflow-x-auto overflow-y-hidden text-white">
        {dailyData.map((item, i) => {
          const skycon = getRseIconForOmwIcon(item.weather[0].icon);

          function handleCardClick() {
            setSelectedDay(i);
          }

          return (
            <Card
              onClick={handleCardClick}
              key={item.dt}
              extraClassName={clsx(
                "cursor-pointer",
                selectedDay === i ? "border-opacity-100 bg-opacity-40" : null
              )}
            >
              <div className="flex flex-col items-center justify-center">
                <DisplayDt
                  dt={item.dt * 1000}
                  dtFormat={dtFormatDayShortWNum}
                />
                <span>
                  <ReactSkycon icon={skycon} color="white" size={50} />
                </span>
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
          );
        })}
      </div>
    </ForecastSection>
  );
}

export default ForecastDaily;
