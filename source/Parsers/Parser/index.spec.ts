import Parser from './index';

describe('Parser', () => {
	describe('stringToMultiline should', () => {
		test('split the 2 line string into an array of 2 items', () => {
			const parser = new Parser();
			const string = `Something was written
on the stone`;
			const result = parser.stringToMultiline(string);

			expect(result).toEqual(['Something was written', 'on the stone']);
		});
	});

	describe('parseTimeStamps should', () => {
		test('return undefined if the string does not contain a valid timestamp marker', () => {
			const parser = new Parser();
			const string = '';
			const result = parser.parseTimeStamps(string, '-->');

			expect(result).toEqual(undefined);
		});
	});

	describe('splitTimeStamp should', () => {
		test('return an object of 0 hours, 1 minute, 51 seconds, 611 milliseconds', () => {
			const parser = new Parser();
			const string = '00:01:51,611';
			const result = parser.splitTimeStamp(string);

			expect(result).toEqual({
				hours: 0,
				minutes: 1,
				seconds: 51,
				milliseconds: 611
			});
		});

		test('return an object of 0 hours, 1 minute, 51 seconds, 611 milliseconds, where seconds > milliseconds is split with a .', () => {
			const parser = new Parser();
			const string = '00:01:51.611';
			const result = parser.splitTimeStamp(string);

			expect(result).toEqual({
				hours: 0,
				minutes: 1,
				seconds: 51,
				milliseconds: 611
			});
		});
	});
});
