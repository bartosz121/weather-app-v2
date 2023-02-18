import { WiSunrise, WiSunset } from "react-icons/wi";

import { dtFormatHHMMWTimezone } from "../utils";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  sunRise: number;
  sunSet: number;
  locationTimezone: string;
};

function SunDayInfoSection({
  sunRise,
  sunSet,
  locationTimezone,
  ...props
}: Props) {
  const dtFormat = dtFormatHHMMWTimezone(locationTimezone);
  return (
    <ForecastSection {...props}>
      <div className="mt-1 md:px-2">
        <div>
          <h4 className="font-semibold">Sunrise</h4>
          <span className="flex flex-row items-center gap-2">
            <WiSunrise className="h-16 w-16" />
            <DisplayDt dt={sunRise} dtFormat={dtFormat} />
          </span>
        </div>
        <div>
          <h4 className="font-semibold">Sunset</h4>
          <span className="flex flex-row items-center gap-2">
            <WiSunset className="h-16 w-16" />
            <DisplayDt dt={sunSet} dtFormat={dtFormat} />
          </span>
        </div>
      </div>
    </ForecastSection>
  );
}

export default SunDayInfoSection;
