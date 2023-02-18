import { Suspense, lazy } from "react";

import { createBrowserRouter } from "react-router-dom";

import Spinner from "./components/Spinner";

const Map = lazy(() => import("./pages/Map"));
const AtomProvider = lazy(() => import("./components/AtomProvider"));

export const router = createBrowserRouter([
  {
    path: "*",
    element: (
      // TODO
      <Suspense fallback={<Spinner />}>
        <Map />
      </Suspense>
    ),
  },
  {
    path: "/:latlon",
    element: (
      <Suspense fallback={<Spinner />}>
        <AtomProvider />
      </Suspense>
    ),
  },
]);
