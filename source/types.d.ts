export interface Cue {
	sequence: number;
	startTime: number;
	endTime: number;
	text: string[];
}

export interface TimeStamp {
	startTime: number;
	endTime: number;
}

export enum Formats {
	Srt = 'SRT',
	WebVtt = 'WEBVTT'
}
