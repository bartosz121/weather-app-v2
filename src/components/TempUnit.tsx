import React from "react";

import clsx from "clsx";
import { useAtom } from "jotai";

import { tempUnitAtom, tempUnit as tempUnitType } from "../state/app.state";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  addOnClickChange?: boolean;
};

function getDisplayUnit(tempUnit: tempUnitType) {
  switch (tempUnit) {
    case "imperial":
      return "F";
    case "metric":
      return "C";
  }
}

function TempUnit({
  onClick,
  className,
  addOnClickChange = false,
  ...props
}: Props) {
  const [tempUnit, setTempUnit] = useAtom(tempUnitAtom);
  const displayUnit = getDisplayUnit(tempUnit);

  function handleTempUnitChange() {
    if (tempUnit === "metric") {
      setTempUnit("imperial");
    } else {
      setTempUnit("metric");
    }
  }

  return (
    <div
      className={clsx(addOnClickChange ? "cursor-pointer" : "", className)}
      onClick={addOnClickChange ? handleTempUnitChange : undefined}
      {...props}
    >
      &deg;{displayUnit}
    </div>
  );
}

export default TempUnit;
