import { Cue, Format, Time } from "./types";
import SrtParser from "./Parsers/SrtParser";
import WebVttParser from "./Parsers/WebVttParser";

function parser(format: Format, string: string): Promise<Cue[]> {
  return new Promise((resolve, reject) => {
    const parser =
      format === Format.WebVtt ? new WebVttParser() : new SrtParser();

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
  format: Format;
} {
  const parts = fileName.toLowerCase().split(".");
  const extension = parts[parts.length - 1];

  let format: Format;

  switch (extension) {
    case "srt":
      format = Format.Srt;
      break;
    case "vtt":
      format = Format.WebVtt;
      break;
    default:
      format = Format.Unsupported;
  }

  return {
    extension,
    format,
  };
}

export { parser, extractFormatFromFileName, Cue, Format, Time };
