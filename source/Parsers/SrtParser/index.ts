import { Cue } from '../../Constants/Interfaces';
import Parser from '../Parser/index';

export default class SrtParser extends Parser {
	parse(string: string): Cue[] {
		const multiline = this.stringToMultiline(string);
		const allRawCueData = this.multilineToRawCueContent(multiline);
		const rawCueData = this.dropInvalidCueData(allRawCueData);

		return this.parseCueData(rawCueData);
	}
}
