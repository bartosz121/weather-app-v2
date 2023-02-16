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
  category: z.string(),
  type: z.string(),
  importance: z.number(),
  place_rank: z.number(),
  icon: z.string().optional(),
});

const geoSearchReverse = geoSearch.extend({
  category: z.string(),
  addresstype: z.string(),
  name: z.string().or(z.null()),
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
      { name: "format", type: "Query", schema: z.literal("jsonv2") },
    ],
  },
  {
    method: "get",
    path: "/reverse",
    alias: "getGeosearchReverse",
    response: geoSearchReverse,
    parameters: [
      { name: "lat", type: "Query", schema: z.number().optional() },
      { name: "lon", type: "Query", schema: z.number().optional() },
      { name: "zoom", type: "Query", schema: z.literal(18) },
      { name: "format", type: "Query", schema: z.literal("jsonv2") },
      { name: "addressdetails", type: "Query", schema: z.literal(0) },
    ],
  },
]);

export const geosearchApi = new ZodiosHooks("geosearchApi", geosearchApiClient);
