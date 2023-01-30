import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import { z } from "zod";

const geoSearch = z.object({
  place_id: z.number(),
  licence: z.string(),
  osm_type: z.string(),
  osm_id: z.number(),
  boundingbox: z.array(z.string()),
  lat: z.string(),
  lon: z.string(),
  display_name: z.string(),
  class: z.string(),
  type: z.string(),
  importance: z.number(),
  icon: z.string().optional(),
});

export type Geosearch = z.infer<typeof geoSearch>;

const geosearchApiClient = new Zodios("https://nominatim.openstreetmap.org", [
  {
    method: "get",
    path: "/",
    alias: "getGeosearch",
    response: z.array(geoSearch),
    parameters: [
      { name: "q", type: "Query", schema: z.string() },
      { name: "limit", type: "Query", schema: z.number() },
      { name: "format", type: "Query", schema: z.string() },
    ],
  },
]);

export const geosearchApi = new ZodiosHooks("geosearchApi", geosearchApiClient);
