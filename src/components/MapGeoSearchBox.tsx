import { ForwardedRef, forwardRef } from "react";

import { useDebounce } from "react-use";

import { Combobox } from "@headlessui/react";
import clsx from "clsx";
import { atom, useAtom, useSetAtom } from "jotai";
import { LatLng } from "leaflet";

import { Geosearch, geosearchApi } from "../api/geosearch.api.zodios";
import { selectedLocationAtom } from "../state/app.state";
import { showSearchBoxAtom } from "./MapGeoSearch";
import Spinner from "./Spinner";

const searchInputAtom = atom("");
const searchInputDebouncedAtom = atom("");

type Props = {};

function MapGeoSearchBox(props: Props, ref: ForwardedRef<HTMLInputElement>) {
  const [showSearchBox, setShowSearchBox] = useAtom(showSearchBoxAtom);
  const [searchInput, setSearchInput] = useAtom(searchInputAtom);
  const setSelectedLocation = useSetAtom(selectedLocationAtom);
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
      queries: { q: searchInputDebounced, limit: 10, format: "jsonv2" },
    },
    { enabled: !!searchInputDebounced, refetchOnWindowFocus: false }
  );

  return (
    <div
      className={clsx(
        "leaflet-ctrl leaflet-control leaflet-control-button leaflet-left ml-3 mt-2 w-80 bg-white",
        "border-1 rounded border border-slate-500 border-opacity-50 shadow-lg",
        showSearchBox ? "visible" : "hidden"
      )}
    >
      <Combobox onChange={handleChangeCombobox}>
        <Combobox.Input
          ref={ref}
          onChange={handleChangeInput}
          className="w-full rounded py-2 px-2 outline-none"
          autoComplete="off"
        />
        <Combobox.Options className="pb-2">
          {geosearchQuery.isLoading ? (
            <div className="py-2">
              <Spinner color="normal" mxAuto={true} />
            </div>
          ) : geosearchQuery.isError ? (
            <h1>Error</h1>
          ) : (
            geosearchQuery.data?.map((item) => (
              <Combobox.Option key={item.place_id} value={item}>
                {({ active }) => (
                  <li
                    className={clsx(
                      "mx-2 cursor-pointer py-2 px-1",
                      "hover:bg-gray-200",
                      active ? "bg-gray-200" : null
                    )}
                  >
                    {item.display_name}
                  </li>
                )}
              </Combobox.Option>
            ))
          )}
        </Combobox.Options>
      </Combobox>
    </div>
  );
}

export default forwardRef<HTMLInputElement, Props>(MapGeoSearchBox);
