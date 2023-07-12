interface Cue {
  sequence: number;
  startTime: number;
  endTime: number;
  text: string[];
}
declare const enum Formats {
  Srt = "SRT",
  WebVtt = "WEBVTT",
  Unsupported = "Unsupported",
}

declare function parser(format: Formats, string: string): Promise<Cue[]>;
declare function extractFormatFromFileName(fileName: string): {
  extension: string;
  format: Formats;
};
export { parser, extractFormatFromFileName, Cue, Formats };
