import { Cue } from '../../Constants/Interfaces';
import Parser from '../Parser/index';

export default class WebVttParser extends Parser {
	parse(string: string): Cue[] {
		const multiline = this.processStringToArray(string);
		const allRawCueData = this.processArrayToArrayBlocks(multiline);
		const rawCueData = this.dropEmptyArrayBlocks(allRawCueData);
		const filteredCueData = this.dropNonCueData(rawCueData);

		return this.processArrayBlocksToCues(filteredCueData);
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
