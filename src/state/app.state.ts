import { atom } from "jotai";
import { LatLng } from "leaflet";

export const selectedLocationAtom = atom<LatLng | null>(null);
