import SrtParser from './Parsers/SrtParser';
import WebVttParser from './Parsers/WebVttParser';

export enum Formats {
	Srt = 'SRT',
	WebVtt = 'WEBVTT'
}

export const parser = (format: Formats, string: string) => {
	switch (format) {
		case Formats.Srt:
			return new SrtParser().parse(string);
		case Formats.WebVtt:
			return new WebVttParser().parse(string);
	}
};
