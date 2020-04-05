import SrtParser from './';

describe('SrtParser', () => {
	describe('parse', () => {
		test('should correctly parse the SRT sample', () => {
			const sample = `1
00:02:17,440 --> 00:02:20,375
Senator, we're making
our final approach into Coruscant.

2
00:02:20,476 --> 00:02:22,501
Very good, Lieutenant.`;

			const srtParser = new SrtParser();
			const result = srtParser.parse(sample);

			expect(result).toEqual([
				{
					sequence: 0,
					startTime: 137440,
					endTime: 140375,
					text: [
						"Senator, we're making",
						'our final approach into Coruscant.'
					]
				},
				{
					sequence: 1,
					startTime: 140476,
					endTime: 142501,
					text: ['Very good, Lieutenant.']
				}
			]);
		});

		test('should correctly parse the SRT sample', () => {
			const sample = `00:02:17,440 --> 00:02:20,375
Senator, we're making
our final approach into Coruscant.

00:02:20,476 --> 00:02:22,501
Very good, Lieutenant.`;

			const srtParser = new SrtParser();
			const result = srtParser.parse(sample);

			expect(result).toEqual([
				{
					sequence: 0,
					startTime: 137440,
					endTime: 140375,
					text: [
						"Senator, we're making",
						'our final approach into Coruscant.'
					]
				},
				{
					sequence: 1,
					startTime: 140476,
					endTime: 142501,
					text: ['Very good, Lieutenant.']
				}
			]);
		});
	});
});
