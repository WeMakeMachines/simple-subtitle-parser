import { Cue } from '../../types';
import Parser from '../Parser/index';

export default class SrtParser extends Parser {
	parse(string: string): Cue[] {
		const multiline = this.processStringToArray(string);
		const allRawCueData = this.processArrayToArrayBlocks(multiline);
		const rawCueData = this.dropEmptyArrayBlocks(allRawCueData);

		return this.processArrayBlocksToCues(rawCueData);
	}
}
