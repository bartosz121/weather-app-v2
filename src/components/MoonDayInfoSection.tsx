import { IconType } from "react-icons";
import { GiHotDog } from "react-icons/gi";
import {
  WiMoonFirstQuarter,
  WiMoonFull,
  WiMoonNew,
  WiMoonThirdQuarter,
  WiMoonWaningCrescent2,
  WiMoonWaningGibbous2,
  WiMoonWaxingCrescent2,
  WiMoonWaxingGibbous2,
  WiMoonrise,
  WiMoonset,
} from "react-icons/wi";

import { dtFormatHHMMWTimezone } from "../utils";
import DisplayDt from "./DisplayDt";
import ForecastSection from "./ForecastSection";

function getMoonPhaseData(moonPhase: number): {
  icon: IconType;
  phaseName: string;
} {
  if (moonPhase === 1 || moonPhase === 0) {
    return {
      icon: WiMoonNew,
      phaseName: "New Moon",
    };
  } else if (moonPhase > 0 && moonPhase < 0.25) {
    return {
      icon: WiMoonWaxingCrescent2,
      phaseName: "Waxing Crescent",
    };
  } else if (moonPhase === 0.25) {
    return {
      icon: WiMoonFirstQuarter,
      phaseName: "First Quarter",
    };
  } else if (moonPhase > 0.25 && moonPhase < 0.5) {
    return {
      icon: WiMoonWaxingGibbous2,
      phaseName: "Waxing Gibbous",
    };
  } else if (moonPhase === 0.5) {
    return {
      icon: WiMoonFull,
      phaseName: "Full Moon",
    };
  } else if (moonPhase > 0.5 && moonPhase < 0.75) {
    return {
      icon: WiMoonWaningGibbous2,
      phaseName: "Waning Gibbous",
    };
  } else if (moonPhase === 0.75) {
    return {
      icon: WiMoonThirdQuarter,
      phaseName: "Third Quarter",
    };
  } else if (moonPhase > 0.75 && moonPhase < 1) {
    return {
      icon: WiMoonWaningCrescent2,
      phaseName: "Waning Crescent",
    };
  } else {
    return {
      icon: GiHotDog,
      phaseName: "Hotdog",
    };
  }
}

type Props = React.HTMLAttributes<HTMLDivElement> & {
  moonRise: number;
  moonSet: number;
  moonPhase: number;
  locationTimezone: string;
};

function MoonDayInfoSection({
  moonRise,
  moonSet,
  moonPhase,
  locationTimezone,
  ...props
}: Props) {
  const dtFormat = dtFormatHHMMWTimezone(locationTimezone);
  const moonPhaseData = getMoonPhaseData(moonPhase);
  return (
    <ForecastSection {...props}>
      <div className="mt-1 flex flex-col justify-center md:px-2">
        <div>
          <h4 className="font-semibold">Moonrise</h4>
          <span className="flex flex-row items-center gap-2">
            <WiMoonrise className="h-16 w-16" />
            <DisplayDt dt={moonRise} dtFormat={dtFormat} />
          </span>
        </div>
        <div>
          <h4 className="font-semibold">Moonset</h4>
          <span className="flex flex-row items-center gap-2">
            <WiMoonset className="h-16 w-16" />
            <DisplayDt dt={moonSet} dtFormat={dtFormat} />
          </span>
        </div>
        <div>
          <h4 className="font-semibold">Moon Phase</h4>
          <span className="flex flex-row items-center gap-2">
            <moonPhaseData.icon className="h-16 w-16" />
            <span>{moonPhaseData.phaseName}</span>
          </span>
        </div>
      </div>
    </ForecastSection>
  );
}

export default MoonDayInfoSection;
