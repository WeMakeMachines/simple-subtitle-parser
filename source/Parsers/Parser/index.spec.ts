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

	describe('multilineToRawCueContent should', () => {
		test('recognise the empty break between the 2 cues, resulting in an array of 2 arrays', () => {
			const parser = new Parser();
			const multiline = [
				'1',
				'00:01:48,108 --> 00:01:51,443',
				'Text',
				'',
				'2',
				'00:01:56,699 --> 00:01:59,827',
				'More text'
			];
			const result = parser.multilineToRawCueContent(multiline);

			expect(result).toEqual([
				['1', '00:01:48,108 --> 00:01:51,443', 'Text'],
				['2', '00:01:56,699 --> 00:01:59,827', 'More text']
			]);
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
