import { timeValuesToMilliseconds } from '../../lib/time';

interface Cue {
	sequence: number;
	startTime: number;
	endTime: number;
	text: string[];
}

interface TimeStamps {
	startTime: number;
	endTime: number;
}

interface TimeValues {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

class SrtParserError extends Error {}

export default class SrtParser {
	parse(string: string): Cue[] {
		const multiline = this.stringToMultiline(string);
		const rawCueContents = this.multilineToRawCueContent(multiline);

		return this.parseCueContents(rawCueContents);
	}

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

	parseCueContents(rawCueContents: Array<string[]>) {
		return rawCueContents.map(rawCueContent => {
			const cueContent = rawCueContent.reduce(
				(cue: Cue, string: string): Cue => {
					const sequence = Number(string);
					const timeStamps = this.parseTimeStamps(string);

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

	parseTimeStamps(string: String): TimeStamps | undefined {
		const marker = '-->';

		if (string.indexOf(marker) === -1) {
			return;
		}

		const [startTimeRaw, endTimeRaw] = string.split(marker);
		const startTimeValues = this.splitTimeStamp(startTimeRaw);
		const endTimeValues = this.splitTimeStamp(endTimeRaw);

		return {
			startTime: timeValuesToMilliseconds(startTimeValues),
			endTime: timeValuesToMilliseconds(endTimeValues)
		};
	}

	splitTimeStamp(timeStamp: string): TimeValues {
		const [hours, minutes, secondsAndMilliseconds] = timeStamp.split(':');
		const [seconds, milliseconds] = secondsAndMilliseconds.split(',');

		return {
			hours: Number(hours),
			minutes: Number(minutes),
			seconds: Number(seconds),
			milliseconds: Number(milliseconds)
		};
	}
}
