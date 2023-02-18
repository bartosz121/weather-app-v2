import { browserLocaleStore } from "./state/app.state";

const { getState } = browserLocaleStore;

const { browserLocale } = getState();

export function getBackgroundImage(icon: string) {
  switch (icon) {
    case "01d":
      return "/clear_day.jpg";
    case "01n":
      return "/clear_night.jpg";
    case "02d":
      return "/partly_cloudy_day.jpg";
    case "02n":
      return "/partly_cloudy_night.jpg";
    case "03d":
      return "/partly_cloudy_day.jpg";
    case "03n":
      return "/partly_cloudy_night.jpg";
    case "04d":
      return "/cloudy_day.jpg";
    case "04n":
      return "/cloudy_night.jpg";
    case "09d":
      return "/rain_day.jpg";
    case "09n":
      return "/rain_night.jpg";
    case "10d":
      return "/rain_day.jpg";
    case "10n":
      return "/rain_night.jpg";
    case "11d":
      return "/thunder_day.jpg";
    case "11n":
      return "/thunder_night.jpg";
    case "13d":
      return "/snow_day.jpg";
    case "13n":
      return "/snow_night.jpg";
    case "50d":
      return "/fog_day.jpg";
    case "50n":
      return "/fog_night.jpg";
    default:
      return "/clear_day.jpg";
  }
}

/** Example: `2/11/23, 3:00:04 PM` */
export function dtFormatMediumWTimezone(timezone: string) {
  return new Intl.DateTimeFormat(browserLocale, {
    dateStyle: "short",
    timeStyle: "medium",
    timeZone: timezone,
  });
}

export function dtFormatHHMMWTimezone(timezone: string) {
  return new Intl.DateTimeFormat(browserLocale, {
    hour: "numeric",
    minute: "numeric",
    timeZone: timezone,
  });
}

export function dtFormatFullWTimezone(timezone: string) {
  return new Intl.DateTimeFormat(browserLocale, {
    dateStyle: "full",
    timeStyle: "full",
    timeZone: timezone,
  });
}

export const dtFormatHHMM = new Intl.DateTimeFormat(browserLocale, {
  hour: "numeric",
  minute: "numeric",
});

export const dtFormatDayShortWNum = new Intl.DateTimeFormat(browserLocale, {
  day: "numeric",
  weekday: "short",
});

export const dtFormatDayDayLongWNum = new Intl.DateTimeFormat(browserLocale, {
  day: "numeric",
  weekday: "long",
});
