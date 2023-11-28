interface Cue {
  sequence: number;
  startTime: Time;
  endTime: Time;
  text: string[];
}

interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  totals: {
    inSeconds: number;
  };
}

declare const enum Format {
  Srt = "SRT",
  WebVtt = "WEBVTT",
  Unsupported = "Unsupported",
}

declare function parser(format: Format, string: string): Promise<Cue[]>;
declare function extractFormatFromFileName(fileName: string): {
  extension: string;
  format: Format;
};
export { parser, extractFormatFromFileName, Cue, Format, Time };
