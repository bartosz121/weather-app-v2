import { Suspense, lazy } from "react";

import { createBrowserRouter } from "react-router-dom";

import AtomProvider from "./components/AtomProvider";
import Map from "./pages/Map";
import SpinnerPage from "./pages/SpinnerPage";

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      <Suspense fallback={<SpinnerPage />}>
        <Map />
      </Suspense>
    ),
  },
  {
    path: "/:latlon",
    element: (
      <Suspense fallback={<SpinnerPage />}>
        <AtomProvider />
      </Suspense>
    ),
  },
]);
