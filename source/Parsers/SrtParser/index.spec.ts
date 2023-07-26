import SrtParser from "./";

describe("SrtParser", () => {
  describe("parse", () => {
    test("should correctly parse the SRT sample", () => {
      const sample = `1
00:02:17,440 --> 00:02:20,375
Senator, we're making
our final approach into Coruscant.

2
00:02:20,476 --> 00:02:22,501
Very good, Lieutenant.`;

      const srtParser = new SrtParser();
      const result = srtParser.parse(sample);

      expect(result).toEqual([
        {
          sequence: 0,
          startTime: {
            hours: 0,
            minutes: 2,
            seconds: 17,
            ms: 440,
            totals: { inSeconds: 137.44 },
          },
          endTime: {
            hours: 0,
            minutes: 2,
            seconds: 20,
            ms: 375,
            totals: { inSeconds: 140.375 },
          },
          text: ["Senator, we're making", "our final approach into Coruscant."],
        },
        {
          sequence: 1,
          startTime: {
            hours: 0,
            minutes: 2,
            seconds: 20,
            ms: 476,
            totals: { inSeconds: 140.476 },
          },
          endTime: {
            hours: 0,
            minutes: 2,
            seconds: 22,
            ms: 501,
            totals: { inSeconds: 142.501 },
          },
          text: ["Very good, Lieutenant."],
        },
      ]);
    });

    test("should correctly parse the SRT sample", () => {
      const sample = `00:02:17,440 --> 00:02:20,375
Senator, we're making
our final approach into Coruscant.

00:02:20,476 --> 00:02:22,501
Very good, Lieutenant.`;

      const srtParser = new SrtParser();
      const result = srtParser.parse(sample);

      expect(result).toEqual([
        {
          sequence: 0,
          startTime: {
            hours: 0,
            minutes: 2,
            seconds: 17,
            ms: 440,
            totals: { inSeconds: 137.44 },
          },
          endTime: {
            hours: 0,
            minutes: 2,
            seconds: 20,
            ms: 375,
            totals: { inSeconds: 140.375 },
          },
          text: ["Senator, we're making", "our final approach into Coruscant."],
        },
        {
          sequence: 1,
          startTime: {
            hours: 0,
            minutes: 2,
            seconds: 20,
            ms: 476,
            totals: { inSeconds: 140.476 },
          },
          endTime: {
            hours: 0,
            minutes: 2,
            seconds: 22,
            ms: 501,
            totals: { inSeconds: 142.501 },
          },
          text: ["Very good, Lieutenant."],
        },
      ]);
    });
  });
});
