import WebVttParser from "./";

describe("WebVttParser", () => {
  describe("parse", () => {
    test("should correctly parse the WebVTT sample", () => {
      const sample = `WEBVTT - This file has cues.

14
00:01:14.815 --> 00:01:18.114
- What?
- Where are we now?

15
00:01:18.171 --> 00:01:20.991
- This is big bat country.

16
00:01:21.058 --> 00:01:23.868
- [ Bats Screeching ]
- They won't get in your hair. They're after the bugs.

1942
02:38:29,251 --> 02:38:32,254
The machine we found out near Saturn
when we found you. Yes.`;

      const webVttParser = new WebVttParser();
      const result = webVttParser.parse(sample);

      expect(result).toEqual([
        {
          sequence: 0,
          startTime: {
            hours: 0,
            minutes: 1,
            seconds: 14,
            ms: 815,
            totals: { inSeconds: 74.815 },
          },
          endTime: {
            hours: 0,
            minutes: 1,
            seconds: 18,
            ms: 114,
            totals: { inSeconds: 78.114 },
          },
          text: ["- What?", "- Where are we now?"],
        },
        {
          sequence: 1,
          startTime: {
            hours: 0,
            minutes: 1,
            seconds: 18,
            ms: 171,
            totals: { inSeconds: 78.171 },
          },
          endTime: {
            hours: 0,
            minutes: 1,
            seconds: 20,
            ms: 991,
            totals: { inSeconds: 80.991 },
          },
          text: ["- This is big bat country."],
        },
        {
          sequence: 2,
          startTime: {
            hours: 0,
            minutes: 1,
            seconds: 21,
            ms: 58,
            totals: { inSeconds: 81.058 },
          },
          endTime: {
            hours: 0,
            minutes: 1,
            seconds: 23,
            ms: 868,
            totals: { inSeconds: 83.868 },
          },
          text: [
            "- [ Bats Screeching ]",
            "- They won't get in your hair. They're after the bugs.",
          ],
        },
        {
          sequence: 3,
          startTime: {
            hours: 2,
            minutes: 38,
            seconds: 29,
            ms: 251,
            totals: { inSeconds: 9509.251 },
          },
          endTime: {
            hours: 2,
            minutes: 38,
            seconds: 32,
            ms: 254,
            totals: { inSeconds: 9512.254 },
          },
          text: [
            "The machine we found out near Saturn",
            "when we found you. Yes.",
          ],
        },
      ]);
    });
  });

  describe("dropNonCueData", function () {
    test("should remove unnecessary data", () => {
      const webVttParser = new WebVttParser();
      const result = webVttParser.dropNonCueData([
        ["WEBVTT"],
        [
          "STYLE",
          "::cue {",
          "\tbackground-image: linear-gradient(to bottom, dimgray, lightgray);",
          "\tcolor: papayawhip;",
          "}",
          '/* Style blocks cannot use blank lines nor "dash dash greater than" */',
        ],
        ["NOTE comment blocks can be used between style blocks."],
        ["STYLE", "::cue(b) {", "\tcolor: peachpuff;", "}"],
        ["00:00:00.000 --> 00:00:10.000", "- Hello <b>world</b>."],
        ["NOTE style blocks cannot appear after the first cue."],
      ]);

      expect(result).toEqual([
        ["00:00:00.000 --> 00:00:10.000", "- Hello <b>world</b>."],
      ]);
    });
  });
});
