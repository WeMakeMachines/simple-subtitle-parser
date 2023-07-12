import { Cue, Formats } from "./types";
import SrtParser from "./Parsers/SrtParser";
import WebVttParser from "./Parsers/WebVttParser";

function parser(format: Formats, string: string): Promise<Cue[]> {
  return new Promise((resolve, reject) => {
    const parser =
      format === Formats.WebVtt ? new WebVttParser() : new SrtParser();

    try {
      const parsed = parser.parse(string);

      resolve(parsed);
    } catch (error) {
      reject(error);
    }
  });
}

function extractFormatFromFileName(fileName: string): {
  extension: string;
  format: Formats;
} {
  const parts = fileName.toLowerCase().split(".");
  const extension = parts[parts.length - 1];

  let format: Formats | "unsupported";

  switch (extension) {
    case "srt":
      format = Formats.Srt;
      break;
    case "vtt":
      format = Formats.WebVtt;
      break;
    default:
      format = Formats.Unsupported;
  }

  return {
    extension,
    format,
  };
}

export { parser as default, extractFormatFromFileName, Cue, Formats };
