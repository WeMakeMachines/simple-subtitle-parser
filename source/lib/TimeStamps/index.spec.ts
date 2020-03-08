import TimeStamps from './index';

describe('parseTimeStamps should', () => {
	test('return undefined if the string does not contain a valid timestamp marker', () => {
		const string = '';
		const result = TimeStamps.parseTimeStamps(string, '-->');

		expect(result).toEqual(undefined);
	});
});

describe('splitTimeStamp should', () => {
	test('return an object of 0 hours, 1 minute, 51 seconds, 611 milliseconds', () => {
		const string = '00:01:51,611';
		const result = TimeStamps.splitTimeStamp(string);

		expect(result).toEqual({
			hours: 0,
			minutes: 1,
			seconds: 51,
			milliseconds: 611
		});
	});

	test('return an object of 0 hours, 1 minute, 51 seconds, 611 milliseconds, where seconds > milliseconds is split with a .', () => {
		const string = '00:01:51.611';
		const result = TimeStamps.splitTimeStamp(string);

		expect(result).toEqual({
			hours: 0,
			minutes: 1,
			seconds: 51,
			milliseconds: 611
		});
	});
});
