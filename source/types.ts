export interface Cue {
  sequence: number;
  startTime: number;
  endTime: number;
  text: string[];
}

export const enum Format {
  Srt = "SRT",
  WebVtt = "WEBVTT",
  Unsupported = "Unsupported",
}
