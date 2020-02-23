import { timeValuesToMilliseconds } from '../../lib/time';

export interface Cue {
	sequence: number;
	startTime: number;
	endTime: number;
	text: string[];
}

export interface TimeStamps {
	startTime: number;
	endTime: number;
}

export interface TimeValues {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

class ParserError extends Error {}

export default class Parser {
	stringToMultiline(string: string) {
		return string.split('\n');
	}

	parseTimeStamps(timeStamp: String, marker: string): TimeStamps | undefined {
		if (timeStamp.indexOf(marker) === -1) {
			return;
		}

		const [startTimeRaw, endTimeRaw] = timeStamp.split(marker);
		const startTimeValues = this.splitTimeStamp(startTimeRaw);
		const endTimeValues = this.splitTimeStamp(endTimeRaw);

		return {
			startTime: timeValuesToMilliseconds(startTimeValues),
			endTime: timeValuesToMilliseconds(endTimeValues)
		};
	}

	splitTimeStamp(timeStamp: string): TimeValues {
		const [hours, minutes, secondsAndMilliseconds] = timeStamp.split(':');

		const millisecondSeparator = secondsAndMilliseconds.includes(',')
			? ','
			: secondsAndMilliseconds.includes('.')
			? '.'
			: '';

		if (millisecondSeparator === '') {
			throw new ParserError('Unable to process timestamp');
		}

		const [seconds, milliseconds] = secondsAndMilliseconds.split(
			millisecondSeparator
		);

		return {
			hours: Number(hours),
			minutes: Number(minutes),
			seconds: Number(seconds),
			milliseconds: Number(milliseconds)
		};
	}
}
