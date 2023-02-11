import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ForecastSection from "./ForecastSection";

const circularProgressbarStyle = buildStyles({
  strokeLinecap: "butt",
  trailColor: "transparent",
  textColor: "#000",
  pathColor: "#000",
  // textColor: "#fff",
  // pathColor: "#fff",
});

type Props = React.HTMLAttributes<HTMLDivElement> & {
  precipitation: number;
  humidity: number;
  uvIndex: number;
  pressure: number;
};

function CircularDayInfoSection({
  precipitation,
  humidity,
  uvIndex,
  pressure,
  ...props
}: Props) {
  return (
    <ForecastSection {...props}>
      <div className="mt-1 flex flex-row flex-wrap justify-around gap-6 md:px-2">
        <div className="flex flex-col items-center">
          <p className="font-medium">Precipitation</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={precipitation}
            maxValue={1}
            text={`${precipitation * 100}%`}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium">Humidity</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={humidity}
            text={`${humidity}%`}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium">UV Index</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={uvIndex}
            maxValue={10}
            text={`${Math.ceil(uvIndex) < 10 ? Math.ceil(uvIndex) : 10}`}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="font-medium">Pressure</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={pressure}
            minValue={980}
            maxValue={1030}
            text={`${pressure}hPa`}
          />
        </div>
      </div>
    </ForecastSection>
  );
}

export default CircularDayInfoSection;
