import { extractFormatFromFileName, Formats } from "./index";

describe("extractFormatFromFileName", () => {
  describe("should correctly extract the extension srt", () => {
    test("for the filename subtitles.srt", () => {
      const fileName = "subtitles.srt";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("srt");
      expect(extraction.format).toEqual(Formats.Srt);
    });

    test("for the filename en.subtitles.srt", () => {
      const fileName = "en.subtitles.srt";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("srt");
      expect(extraction.format).toEqual(Formats.Srt);
    });

    test("for the filename en.subtitles.SRT", () => {
      const fileName = "en.subtitles.SRT";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("srt");
      expect(extraction.format).toEqual(Formats.Srt);
    });
  });

  describe("should correctly extract the extension vtt", function () {
    test("for the filename subtitles.vtt", () => {
      const fileName = "subtitles.vtt";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("vtt");
      expect(extraction.format).toEqual(Formats.WebVtt);
    });

    test("for the filename en.subtitles.vtt", () => {
      const fileName = "en.subtitles.vtt";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("vtt");
      expect(extraction.format).toEqual(Formats.WebVtt);
    });

    test("for the filename en.subtitles.VTT", () => {
      const fileName = "en.subtitles.VTT";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("vtt");
      expect(extraction.format).toEqual(Formats.WebVtt);
    });
  });

  describe("should register unsupported formats", () => {
    test("for the filename subtitles.txt", () => {
      const fileName = "subtitles.txt";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("txt");
      expect(extraction.format).toEqual(Formats.Unsupported);
    });

    test("for the filename subtitles.sub", () => {
      const fileName = "subtitles.sub";

      const extraction = extractFormatFromFileName(fileName);

      expect(extraction.extension).toEqual("sub");
      expect(extraction.format).toEqual(Formats.Unsupported);
    });
  });
});
