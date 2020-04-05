import { Cue } from '../../types';
import TimeStamps from '../../lib/TimeStamps/index';

class ParserError extends Error {}

export default class Parser {
	public timeStampMarker = '-->';

	processStringToArray(string: string): string[] {
		return string.split('\n');
	}

	processArrayToArrayBlocks(array: string[]): Array<string[]> {
		return array.reduce(
			(arrayBlockAccumulator: Array<string[]>, currentLine: string) => {
				if (currentLine === '') {
					arrayBlockAccumulator.push([]);
				} else {
					arrayBlockAccumulator[
						arrayBlockAccumulator.length - 1
					].push(currentLine);
				}

				return arrayBlockAccumulator;
			},
			[[]]
		);
	}

	dropEmptyArrayBlocks(arrayBlocks: Array<string[]>): Array<string[]> {
		return arrayBlocks.filter(arrayBlock => arrayBlock.length);
	}

	processArrayBlocksToCues(arrayBlocks: Array<string[]>): Cue[] {
		return arrayBlocks.map((block, blockIndex) => {
			const processedCue = block.reduce(
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
					sequence: blockIndex,
					startTime: 0,
					endTime: 0,
					text: []
				}
			);

			if (processedCue.endTime <= processedCue.startTime) {
				throw new ParserError('Invalid Cue: Timecodes not valid');
			}

			return processedCue;
		});
	}
}
