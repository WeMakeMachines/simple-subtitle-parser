import TimeStamps from "./";

describe("parseTimeStamps should", () => {
  test("return undefined if the string does not contain a valid timestamp marker", () => {
    const string = "";
    const result = TimeStamps.parseTimeStamps(string, "-->");

    expect(result).toEqual(undefined);
  });

  test("return a correctly parsed Time object for the string '00:01:51,611 --> 00:02:34,23'", () => {
    const string = "00:01:51,611 --> 00:02:34,23";
    const result = TimeStamps.parseTimeStamps(string, "-->");

    expect(result).toEqual({
      startTime: {
        hours: 0,
        minutes: 1,
        seconds: 51,
        ms: 611,
        totals: { inSeconds: 111.611 },
      },
      endTime: {
        hours: 0,
        minutes: 2,
        seconds: 34,
        ms: 23,
        totals: { inSeconds: 154.023 },
      },
    });
  });
});

describe("splitTimeStamp should", () => {
  test("return an object of 0 hours, 1 minute, 51 seconds, 611 ms", () => {
    const string = "00:01:51,611";
    const result = TimeStamps.splitTimeStamp(string);

    expect(result).toEqual({
      hours: 0,
      minutes: 1,
      seconds: 51,
      ms: 611,
    });
  });

  test("return an object of 0 hours, 1 minute, 51 seconds, 611 ms, where seconds > ms is split with a .", () => {
    const string = "00:01:51.611";
    const result = TimeStamps.splitTimeStamp(string);

    expect(result).toEqual({
      hours: 0,
      minutes: 1,
      seconds: 51,
      ms: 611,
    });
  });
});
