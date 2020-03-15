import SrtParser from './Parsers/SrtParser';
import WebVttParser from './Parsers/WebVttParser';

export enum Formats {
	Srt = 'SRT',
	WebVtt = 'WEBVTT'
}

export const parser = (format: Formats, string: string) => {
	return new Promise((resolve, reject) => {
		const parser =
			format === Formats.WebVtt ? new WebVttParser() : new SrtParser();

		try {
			const parsed = parser.parse(string);

			resolve(parsed);
		} catch (error) {
			reject(error);
		}
	});
};
