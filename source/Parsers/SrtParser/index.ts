import { Cue } from '../../Constants/Interfaces';
import Parser from '../Parser/index';

export default class SrtParser extends Parser {
	parse(string: string): Cue[] {
		const multiline = this.stringToMultiline(string);
		const rawCueContents = this.multilineToRawCueContent(multiline);

		return this.parseCueData(rawCueContents);
	}
}
