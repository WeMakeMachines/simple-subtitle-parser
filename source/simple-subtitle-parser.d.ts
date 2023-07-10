interface Cue {
	sequence: number;
	startTime: number;
	endTime: number;
	text: string[];
}
declare const enum Formats {
	Srt = 'SRT',
	WebVtt = 'WEBVTT'
}

declare const parser: (format: Formats, string: string) => Promise<Cue[]>;
export { parser as default, Cue, Formats };
