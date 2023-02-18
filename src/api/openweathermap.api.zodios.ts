import { Zodios } from "@zodios/core";
import { ZodiosHooks } from "@zodios/react";
import { z } from "zod";

const openWeatherMapForecastBase = z.object({
  dt: z.number(),
  temp: z.number(),
  feels_like: z.number(),
  pressure: z.number(),
  humidity: z.number(),
  dew_point: z.number(),
  uvi: z.number(),
  clouds: z.number(),
  wind_speed: z.number(),
  wind_deg: z.number(),
  wind_gust: z.number().optional(),
  rain: z.object({ "1h": z.number() }).optional(),
  snow: z.object({ "1h": z.number() }).optional(),
});

const openWeatherMapWeather = z.object({
  id: z.number(),
  main: z.string(),
  description: z.string(),
  icon: z.string(), // TODO
});

export const openWeatherMapCurrent = openWeatherMapForecastBase.extend({
  visibility: z.number(),
  sunrise: z.number().optional(),
  sunset: z.number().optional(),
  weather: z.array(openWeatherMapWeather),
});

export const openWeatherMapAlert = z.object({
  sender_name: z.string(),
  event: z.string(),
  start: z.number(),
  end: z.number(),
  description: z.string(),
  tags: z.array(z.string()),
});

const openWeatherMapMinutely = z.object({
  dt: z.number(),
  precipitation: z.number(),
});

export const openWeatherMapHourly = openWeatherMapForecastBase.extend({
  weather: z.array(openWeatherMapWeather),
  visibility: z.number(),
  pop: z.number(),
});

export const openWeatherMapDaily = openWeatherMapForecastBase.extend({
  sunrise: z.number(),
  sunset: z.number(),
  moonrise: z.number(),
  moonset: z.number(),
  moon_phase: z.number(),
  pop: z.number(),
  weather: z.array(openWeatherMapWeather),
  temp: z.object({
    morn: z.number(),
    day: z.number(),
    eve: z.number(),
    night: z.number(),
    min: z.number(),
    max: z.number(),
  }),
  feels_like: z.object({
    morn: z.number(),
    day: z.number(),
    eve: z.number(),
    night: z.number(),
  }),
  rain: z.number().optional(),
  snow: z.number().optional(),
});

const openWeatherMapOneCall = z.object({
  lat: z.number(),
  lon: z.number(),
  timezone: z.string(),
  timezone_offset: z.number(),
  current: openWeatherMapCurrent,
  minutely: z.array(openWeatherMapMinutely).optional(),
  hourly: z.array(openWeatherMapHourly),
  daily: z.array(openWeatherMapDaily),
  alerts: z.array(openWeatherMapAlert).optional(),
});

export const unitsSchema = z.literal("metric").or(z.literal("imperial"));

const openWeatherMapApiClient = new Zodios("https://api.openweathermap.org", [
  {
    method: "get",
    path: "/data/2.5/onecall",
    alias: "getOneCallForecast",
    response: openWeatherMapOneCall,
    parameters: [
      { name: "lat", type: "Query", schema: z.number().optional() },
      { name: "lon", type: "Query", schema: z.number().optional() },
      {
        name: "units",
        type: "Query",
        schema: unitsSchema,
      },
      { name: "appid", type: "Query", schema: z.string() },
    ],
  },
]);

export const openWeatherMapApi = new ZodiosHooks(
  "openWeatherMapApi",
  openWeatherMapApiClient
);
