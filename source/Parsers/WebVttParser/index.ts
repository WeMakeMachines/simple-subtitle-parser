import { Cue } from '../../types';
import Parser from '../Parser/index';

export default class WebVttParser extends Parser {
	public timeStampMarker = '-->';

	parse(string: string): Cue[] {
		const multiline = Parser.processStringToArray(string);
		const allRawCueData = Parser.processArrayToArrayBlocks(multiline);
		const rawCueData = Parser.dropEmptyArrayBlocks(allRawCueData);
		const filteredCueData = this.dropNonCueData(rawCueData);

		return Parser.processArrayBlocksToCues(
			filteredCueData,
			this.timeStampMarker
		);
	}

	dropNonCueData(rawCueData: string[][]): string[][] {
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
