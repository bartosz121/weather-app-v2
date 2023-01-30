import clsx from "clsx";
import { atom, useAtom } from "jotai";

import MapGeoSearchBox from "./MapGeoSearchBox";

const SearchSvg = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="icon icon-tabler icon-tabler-search"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    strokeWidth="2"
    stroke="currentColor"
    fill="none"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <circle cx="10" cy="10" r="7" />
    <line x1="21" y1="21" x2="15" y2="15" />
  </svg>
);

type Props = {
  margins?: string;
  className?: string;
};

export const showSearchBoxAtom = atom(false);

export default function MapGeoSearch(props: Props) {
  const [showInput, setShowInput] = useAtom(showSearchBoxAtom);

  function handleToggle() {
    setShowInput((state) => !state);
  }

  return (
    <div>
      <button
        onClick={handleToggle}
        className={clsx(
          "leaflet-control leaflet-control-button leaflet-left leaflet-right py-2 px-2 cursor-pointer",
          props.margins ?? "mt-20 ml-3",
          showInput
            ? "bg-gray-200 hover:bg-white"
            : "bg-white hover:bg-gray-200",
          "rounded border border-1 border-slate-500 border-opacity-50 shadow-lg",
          "transition-colors",
          props.className
        )}
      >
        {SearchSvg}
      </button>
      <MapGeoSearchBox />
    </div>
  );
}
