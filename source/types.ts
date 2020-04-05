export interface Cue {
	sequence: number;
	startTime: number;
	endTime: number;
	text: string[];
}

export enum Formats {
	Srt = 'SRT',
	WebVtt = 'WEBVTT'
}
