import SrtParser from './index';

describe('SrtParser', () => {
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
});
