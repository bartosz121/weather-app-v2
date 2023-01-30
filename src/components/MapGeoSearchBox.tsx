import { useMap } from "react-leaflet";
import { useDebounce } from "react-use";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { atom, useAtom } from "jotai";
import { LatLng } from "leaflet";

import { Geosearch, geosearchApi } from "../api/geosearch.api.zodios";
import { selectedLocationAtom } from "../state/app.state";
import { showSearchBoxAtom } from "./MapGeoSearch";
import Spinner from "./Spinner";

const searchInputAtom = atom("");
const searchInputDebouncedAtom = atom("");

function MapGeoSearchBox() {
  const [showSearchBox, setShowSearchBox] = useAtom(showSearchBoxAtom);
  const [searchInput, setSearchInput] = useAtom(searchInputAtom);
  const [, setSelectedLocation] = useAtom(selectedLocationAtom);
  const [searchInputDebounced, setSearchInputDebounced] = useAtom(
    searchInputDebouncedAtom
  );
  const [, cancel] = useDebounce(
    () => {
      setSearchInputDebounced(searchInput);
    },
    800,
    [searchInput]
  );

  function handleChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    setSearchInput(e.target.value);
  }

  function handleChangeCombobox(geosearchItem: Geosearch) {
    setSelectedLocation(
      new LatLng(Number(geosearchItem.lat), Number(geosearchItem.lon))
    );
    setShowSearchBox(false);
  }

  const geosearchQuery = geosearchApi.useGetGeosearch(
    {
      queries: { q: searchInputDebounced, limit: 5, format: "json" },
    },
    { enabled: !!searchInputDebounced, refetchOnWindowFocus: false }
  );

  return (
    <div
      className={clsx(
        "leaflet-control leaflet-control-button leaflet-left w-80 ml-3 mt-2 bg-white",
        "rounded border border-1 border-slate-500 border-opacity-50 shadow-lg",
        showSearchBox ? "visible" : "hidden"
      )}
    >
      <Combobox onChange={handleChangeCombobox}>
        <Combobox.Input
          onChange={handleChangeInput}
          className="w-full rounded py-2 px-2"
        />
        <Combobox.Options className="pb-2">
          {geosearchQuery.isLoading ? (
            <div className="py-2">
              <Spinner mxAuto={true} />
            </div>
          ) : geosearchQuery.isError ? (
            <h1>Error</h1>
          ) : (
            geosearchQuery.data?.map((item) => (
              <Combobox.Option
                key={item.place_id}
                value={item}
                className={clsx(
                  "py-2 px-1 mx-2 cursor-pointer",
                  "hover:bg-gray-200"
                )}
              >
                {item.display_name}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default MapGeoSearchBox;
