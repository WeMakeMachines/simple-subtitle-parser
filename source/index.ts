import { Cue, Formats } from './types';
import SrtParser from './Parsers/SrtParser';
import WebVttParser from './Parsers/WebVttParser';

const parser = (format: Formats, string: string): Promise<Cue[]> => {
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

export { parser as default, Cue, Formats };
