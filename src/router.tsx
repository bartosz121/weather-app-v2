import { Suspense, lazy } from "react";

import { createBrowserRouter } from "react-router-dom";

import SpinnerPage from "./pages/SpinnerPage";

const Map = lazy(() => import("./pages/Map"));
const AtomProvider = lazy(() => import("./components/AtomProvider"));

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
