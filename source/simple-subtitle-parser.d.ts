interface Cue {
  sequence: number;
  startTime: number;
  endTime: number;
  text: string[];
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
export { parser, extractFormatFromFileName, Cue, Format };
