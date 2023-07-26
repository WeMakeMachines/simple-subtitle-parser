import { timeValuesToSeconds } from "../time";
import { Time } from "../../types";

interface TimeValues {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
}

interface TimeStamp {
  startTime: Time;
  endTime: Time;
}

class TimeStampsError extends Error {}

export default class TimeStamps {
  static parseTimeStamps(
    string: string,
    marker: string
  ): TimeStamp | undefined {
    const [startTimeRaw, endTimeRaw] = string.split(marker);

    if (!endTimeRaw) {
      return;
    }

    const startTimeValues = TimeStamps.splitTimeStamp(startTimeRaw);
    const endTimeValues = TimeStamps.splitTimeStamp(endTimeRaw);

    return {
      startTime: {
        ...startTimeValues,
        totals: { inSeconds: timeValuesToSeconds(startTimeValues) },
      },
      endTime: {
        ...endTimeValues,
        totals: { inSeconds: timeValuesToSeconds(endTimeValues) },
      },
    };
  }

  static splitTimeStamp(timeStamp: string): TimeValues {
    const [hours, minutes, secondsAndMilliseconds] = timeStamp.split(":");

    const millisecondSeparator = secondsAndMilliseconds.includes(",")
      ? ","
      : secondsAndMilliseconds.includes(".")
      ? "."
      : "";

    if (millisecondSeparator === "") {
      throw new TimeStampsError("Unable to process timestamp");
    }

    const [seconds, ms] = secondsAndMilliseconds.split(millisecondSeparator);

    return {
      hours: Number(hours),
      minutes: Number(minutes),
      seconds: Number(seconds),
      ms: Number(ms),
    };
  }
}
