export interface Cue {
  sequence: number;
  startTime: Time;
  endTime: Time;
  text: string[];
}

export interface Time {
  hours: number;
  minutes: number;
  seconds: number;
  ms: number;
  totals: {
    inSeconds: number;
  };
}

export const enum Format {
  Srt = "SRT",
  WebVtt = "WEBVTT",
  Unsupported = "Unsupported",
}
