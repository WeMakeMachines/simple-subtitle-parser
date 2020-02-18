import SrtParser from './index';

describe('SrtParser', () => {
	describe('stringToMultiline should', () => {
		test('split the 2 line string into an array of 2 items', () => {
			const srtParser = new SrtParser();
			const string = `Something was written
on the stone`;
			const result = srtParser.stringToMultiline(string);

			expect(result).toEqual(['Something was written', 'on the stone']);
		});
	});

	describe('multilineToRawCueContent should', () => {
		test('recognise the empty break between the 2 cues, resulting in an array of 2 arrays', () => {
			const srtParser = new SrtParser();
			const multiline = [
				'1',
				'00:01:48,108 --> 00:01:51,443',
				'Text',
				'',
				'2',
				'00:01:56,699 --> 00:01:59,827',
				'More text'
			];
			const result = srtParser.multilineToRawCueContent(multiline);

			expect(result).toEqual([
				['1', '00:01:48,108 --> 00:01:51,443', 'Text'],
				['2', '00:01:56,699 --> 00:01:59,827', 'More text']
			]);
		});
	});

	describe('parseCueContents should', () => {
		test('map the array of arrays into an array of objects, with the properties correctly identified', () => {
			const srtParser = new SrtParser();
			const result = srtParser.parseCueContents([
				['1', '00:01:48,108 --> 00:01:51,443', 'Text'],
				['2', '00:01:56,699 --> 00:01:59,827', 'More text']
			]);

			expect(result).toEqual([
				{
					sequence: 1,
					startTime: 108108,
					endTime: 111443,
					text: ['Text']
				},
				{
					sequence: 2,
					startTime: 116699,
					endTime: 119827,
					text: ['More text']
				}
			]);
		});

		test('Should not find a sequence marker, if one has already been set', () => {
			const srtParser = new SrtParser();
			const result = srtParser.parseCueContents([
				['1', '00:01:48,108 --> 00:01:51,443', '12']
			]);

			expect(result).toEqual([
				{
					sequence: 1,
					startTime: 108108,
					endTime: 111443,
					text: ['12']
				}
			]);
		});

		test('Throw if no valid index is found', () => {
			const srtParser = new SrtParser();

			expect(() => {
				srtParser.parseCueContents([
					['1x', '00:01:48,108 --> 00:01:51,443', 'Text']
				]);
			}).toThrowError();
		});

		test('Throw if the start time is greater than the end time', () => {
			const srtParser = new SrtParser();

			expect(() => {
				srtParser.parseCueContents([
					['1', '00:01:51,443 --> 00:01:48,108', 'Text']
				]);
			}).toThrowError();
		});
	});

	describe('parseTimeStamps should', () => {
		test('return undefined if the string does not contain a valid timestamp marker', () => {
			const srtParser = new SrtParser();
			const string = '';
			const result = srtParser.parseTimeStamps(string);

			expect(result).toEqual(undefined);
		});
	});

	describe('splitTimeStamp should', () => {
		test('return an object of 0 hours, 1 minute, 51 seconds, 611 milliseconds', () => {
			const srtParser = new SrtParser();
			const string = '00:01:51,611';
			const result = srtParser.splitTimeStamp(string);

			expect(result).toEqual({
				hours: 0,
				minutes: 1,
				seconds: 51,
				milliseconds: 611
			});
		});
	});
});
