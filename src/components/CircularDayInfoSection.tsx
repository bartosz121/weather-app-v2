import React from "react";

import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import ForecastSection from "./ForecastSection";

const circularProgressbarStyle = buildStyles({
  strokeLinecap: "butt",
  trailColor: "transparent",
  textColor: "#fff",
  pathColor: "#fff",
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
          <p className="mb-2 font-semibold">Precipitation</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={precipitation}
            maxValue={1}
            text={`${(precipitation * 100).toFixed(0)}%`}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Humidity</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={humidity}
            text={`${humidity.toFixed(0)}%`}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">UV Index</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={uvIndex}
            maxValue={10}
            text={`${
              Math.ceil(uvIndex) < 10 ? Math.ceil(uvIndex).toFixed(0) : 10
            }`}
          />
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 font-semibold">Pressure</p>
          <CircularProgressbar
            className="h-24 w-24"
            styles={circularProgressbarStyle}
            value={pressure}
            minValue={980}
            maxValue={1030}
            text={`${pressure.toFixed(0)}hPa`}
          />
        </div>
      </div>
    </ForecastSection>
  );
}

export default CircularDayInfoSection;
