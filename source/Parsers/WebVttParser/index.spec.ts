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
- They won't get in your hair. They're after the bugs.`;

      const webVttParser = new WebVttParser();
      const result = webVttParser.parse(sample);

      expect(result).toEqual([
        {
          sequence: 0,
          startTime: 74815,
          endTime: 78114,
          text: ["- What?", "- Where are we now?"],
        },
        {
          sequence: 1,
          startTime: 78171,
          endTime: 80991,
          text: ["- This is big bat country."],
        },
        {
          sequence: 2,
          startTime: 81058,
          endTime: 83868,
          text: [
            "- [ Bats Screeching ]",
            "- They won't get in your hair. They're after the bugs.",
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
