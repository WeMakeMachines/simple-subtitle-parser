import { timeValuesToMilliseconds } from '../time/index';
import { TimeStamp } from '../../Constants/Interfaces';

export interface TimeValues {
	hours: number;
	minutes: number;
	seconds: number;
	milliseconds: number;
}

class TimeStampsError extends Error {}

export default class TimeStamps {
	static parseTimeStamps(
		string: String,
		marker: string
	): TimeStamp | undefined {
		const [startTimeRaw, endTimeRaw] = string.split(marker);

		if (!endTimeRaw) {
			return;
		}

		const startTimeValues = TimeStamps.splitTimeStamp(startTimeRaw);
		const endTimeValues = TimeStamps.splitTimeStamp(endTimeRaw);

		return {
			startTime: timeValuesToMilliseconds(startTimeValues),
			endTime: timeValuesToMilliseconds(endTimeValues)
		};
	}

	static splitTimeStamp(timeStamp: string): TimeValues {
		const [hours, minutes, secondsAndMilliseconds] = timeStamp.split(':');

		const millisecondSeparator = secondsAndMilliseconds.includes(',')
			? ','
			: secondsAndMilliseconds.includes('.')
			? '.'
			: '';

		if (millisecondSeparator === '') {
			throw new TimeStampsError('Unable to process timestamp');
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
