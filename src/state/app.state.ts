import { atom } from "jotai";
import { LatLng } from "leaflet";
import { z } from "zod";
import { createStore } from "zustand/vanilla";

import { unitsSchema } from "../api/openweathermap.api.zodios";

export type tempUnit = z.infer<typeof unitsSchema>;

export const selectedLocationAtom = atom<LatLng | null>(null);
export const selectedDayAtom = atom<number>(0);
export const tempUnitAtom = atom<tempUnit>("metric");
export const forecastBackgroundAtom = atom<string | null>(null);

function getBrowserLocale() {
  if (navigator.language) {
    return navigator.language;
  }
  return null;
}

interface BrowserLocaleState {
  browserLocale: string;
}

export const browserLocaleStore = createStore<BrowserLocaleState>(() => {
  const browserLocale = getBrowserLocale();
  return {
    browserLocale: browserLocale ? browserLocale : "en-US",
  };
});
