import Parser, { Cue } from '../Parser/index';

class SrtParserError extends Error {}

export default class SrtParser extends Parser {
	private timeStampMarker = '-->';

	parse(string: string): Cue[] {
		const multiline = this.stringToMultiline(string);
		const rawCueContents = this.multilineToRawCueContent(multiline);

		return this.parseCueData(rawCueContents);
	}

	parseCueData(rawCueData: Array<string[]>) {
		return rawCueData.map(rawCue => {
			const cueContent = rawCue.reduce(
				(cue: Cue, string: string): Cue => {
					const sequence = Number(string);
					const timeStamps = this.parseTimeStamps(
						string,
						this.timeStampMarker
					);

					if (cue.sequence === -1 && sequence) {
						cue.sequence = sequence;

						return cue;
					}

					if (timeStamps) {
						cue.startTime = timeStamps.startTime;
						cue.endTime = timeStamps.endTime;

						return cue;
					}

					cue.text.push(string);

					return cue;
				},
				{
					sequence: -1,
					startTime: 0,
					endTime: 0,
					text: []
				}
			);

			if (cueContent.sequence === -1) {
				throw new SrtParserError(
					'Invalid Cue: Sequence marker not identified'
				);
			}

			if (cueContent.endTime < cueContent.startTime) {
				throw new SrtParserError('Invalid Cue: Timecodes not valid');
			}

			return cueContent;
		});
	}
}
