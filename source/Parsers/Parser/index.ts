import TimeStamps from '../../lib/TimeStamps/index';
import { Cue } from '../../Constants/Interfaces';

class ParserError extends Error {}

export default class Parser {
	public timeStampMarker = '-->';

	stringToMultiline(string: string) {
		return string.split('\n');
	}

	multilineToRawCueContent(multiline: string[]) {
		return multiline.reduce(
			(cueAccumulator: Array<string[]>, currentLine: string) => {
				if (currentLine === '') {
					cueAccumulator.push([]);
				} else {
					cueAccumulator[cueAccumulator.length - 1].push(currentLine);
				}

				return cueAccumulator;
			},
			[[]]
		);
	}

	parseCueData(rawCueData: Array<string[]>) {
		return rawCueData.map((rawCue, rawCueIndex) => {
			const cueContent = rawCue.reduce(
				(cue: Cue, string: string, index: number): Cue => {
					// Ignore cue identifier
					if (index === 0 && !string.includes(this.timeStampMarker)) {
						return cue;
					}

					if (!cue.endTime && string.includes(this.timeStampMarker)) {
						const timeStamps = TimeStamps.parseTimeStamps(
							string,
							this.timeStampMarker
						);

						if (timeStamps) {
							cue.startTime = timeStamps.startTime;
							cue.endTime = timeStamps.endTime;
						}

						return cue;
					}

					cue.text.push(string);

					return cue;
				},
				{
					sequence: rawCueIndex,
					startTime: 0,
					endTime: 0,
					text: []
				}
			);

			if (cueContent.endTime <= cueContent.startTime) {
				throw new ParserError('Invalid Cue: Timecodes not valid');
			}

			return cueContent;
		});
	}
}
