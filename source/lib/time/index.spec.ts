import { timeValuesToSeconds } from "./";

describe("time library", () => {
  describe("timeValuesToSeconds", () => {
    test("should return 0 if no values are provided", () => {
      const result = timeValuesToSeconds({});

      expect(result).toEqual(0);
    });

    test("should return 0.9 for an object of 900 ms", () => {
      const result = timeValuesToSeconds({
        ms: 900,
      });

      expect(result).toEqual(0.9);
    });

    test("should return 1 for an object of 1 seconds", () => {
      const result = timeValuesToSeconds({
        seconds: 1,
      });

      expect(result).toEqual(1);
    });

    test("should return 1.9 for an object of 900 ms and 1 second", () => {
      const result = timeValuesToSeconds({
        ms: 900,
        seconds: 1,
      });

      expect(result).toEqual(1.9);
    });

    test("should return 60 for an object of 1 minute", () => {
      const result = timeValuesToSeconds({
        minutes: 1,
      });

      expect(result).toEqual(60);
    });

    test("should return 3600 for an object of 1 hour", () => {
      const result = timeValuesToSeconds({
        hours: 1,
      });

      expect(result).toEqual(3600);
    });
  });
});
