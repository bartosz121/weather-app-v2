import { z } from "zod";

import { openWeatherMapDaily } from "../api/openweathermap.api.zodios";
import ForecastSection from "./ForecastSection";
import TempUnit from "./TempUnit";

type DataWrapperProps = {
  name: string;
  data: number;
  children?: React.ReactNode;
};

function DataWrapper({ name, data, children }: DataWrapperProps) {
  return (
    <div className="flex flex-row">
      <span className="mr-1">{name}</span>
      <span>{data.toFixed(2)}</span>
      {children}
    </div>
  );
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  dailyData: z.infer<typeof openWeatherMapDaily>;
};

function GeneralDayInfoSection({ dailyData, ...props }: Props) {
  return (
    <ForecastSection {...props}>
      <div className="mt-1 flex flex-col md:px-2">
        <h4 className="text-lg font-medium capitalize">
          {dailyData.weather[0].description}
        </h4>
        {dailyData.rain ? (
          <DataWrapper name="Rain" data={dailyData.rain}>
            <span>mm</span>
          </DataWrapper>
        ) : null}
        {dailyData.snow ? (
          <DataWrapper name="Snow" data={dailyData.snow}>
            <span>mm</span>
          </DataWrapper>
        ) : null}
        <DataWrapper name="Morning" data={dailyData.temp.morn}>
          <TempUnit />
        </DataWrapper>
        <DataWrapper name="Day" data={dailyData.temp.day}>
          <TempUnit />
        </DataWrapper>
        <DataWrapper name="Evening" data={dailyData.temp.eve}>
          <TempUnit />
        </DataWrapper>
        <DataWrapper name="Night" data={dailyData.temp.night}>
          <TempUnit />
        </DataWrapper>
      </div>
    </ForecastSection>
  );
}

export default GeneralDayInfoSection;
