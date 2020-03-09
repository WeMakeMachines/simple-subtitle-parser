import { Cue } from '../../Constants/Interfaces';
import Parser from '../Parser/index';

export default class WebVttParser extends Parser {
	parse(string: string): Cue[] {
		const multiline = this.stringToMultiline(string);
		const allRawCueData = this.multilineToRawCueContent(multiline);
		const rawCueData = this.dropInvalidCueData(allRawCueData);
		const filteredCueData = this.dropNonCueData(rawCueData);

		return this.parseCueData(filteredCueData);
	}

	dropNonCueData(rawCueData: Array<string[]>) {
		return rawCueData.filter(cueData => {
			const [header] = cueData;
			const isValidData = !(
				header.startsWith('WEBVTT') ||
				header.startsWith('NOTE') ||
				header.startsWith('STYLE')
			);

			return isValidData;
		});
	}
}