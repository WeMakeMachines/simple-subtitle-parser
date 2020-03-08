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
		test('recognise the empty breaks in the SRT sample and output an array of arrays', () => {
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

		test('', () => {
			const parser = new Parser();
			const multiline = [
				'WEBVTT',
				'',
				'STYLE',
				'::cue {',
				'\tbackground-image: linear-gradient(to bottom, dimgray, lightgray);',
				'\tcolor: papayawhip;',
				'}',
				'/* Style blocks cannot use blank lines nor "dash dash greater than" */',
				'',
				'NOTE comment blocks can be used between style blocks.',
				'',
				'STYLE',
				'::cue(b) {',
				'\tcolor: peachpuff;',
				'}',
				'',
				'1',
				'00:00:00.000 --> 00:00:10.000',
				'- Hello <b>world</b>.',
				'',
				'NOTE style blocks cannot appear after the first cue.'
			];
			const result = parser.multilineToRawCueContent(multiline);

			expect(result).toEqual([
				['WEBVTT'],
				[
					'STYLE',
					'::cue {',
					'\tbackground-image: linear-gradient(to bottom, dimgray, lightgray);',
					'\tcolor: papayawhip;',
					'}',
					'/* Style blocks cannot use blank lines nor "dash dash greater than" */'
				],
				['NOTE comment blocks can be used between style blocks.'],
				['STYLE', '::cue(b) {', '\tcolor: peachpuff;', '}'],
				['1', '00:00:00.000 --> 00:00:10.000', '- Hello <b>world</b>.'],
				['NOTE style blocks cannot appear after the first cue.']
			]);
		});
	});

	describe('parseCueData should', () => {
		test('map the array of arrays into an array of objects, with the properties correctly identified', () => {
			const parser = new Parser();
			const result = parser.parseCueData([
				['1', '00:01:48,108 --> 00:01:51,443', 'Text'],
				['2', '00:01:56,699 --> 00:01:59,827', 'More text']
			]);

			expect(result).toEqual([
				{
					sequence: 0,
					startTime: 108108,
					endTime: 111443,
					text: ['Text']
				},
				{
					sequence: 1,
					startTime: 116699,
					endTime: 119827,
					text: ['More text']
				}
			]);
		});

		test('Should not confuse a numeric caption for a sequence marker', () => {
			const parser = new Parser();
			const result = parser.parseCueData([
				['1', '00:01:48,108 --> 00:01:51,443', '12']
			]);

			expect(result).toEqual([
				{
					sequence: 0,
					startTime: 108108,
					endTime: 111443,
					text: ['12']
				}
			]);
		});

		test('correctly map if the WebVTT does not include the optional cue identifier', () => {
			const parser = new Parser();
			const result = parser.parseCueData([
				['00:01:48,108 --> 00:01:51,443', 'Text'],
				['00:01:56,699 --> 00:01:59,827', 'More text']
			]);

			expect(result).toEqual([
				{
					sequence: 0,
					startTime: 108108,
					endTime: 111443,
					text: ['Text']
				},
				{
					sequence: 1,
					startTime: 116699,
					endTime: 119827,
					text: ['More text']
				}
			]);
		});

		test('Throw error if the start time is greater than the end time', () => {
			const parser = new Parser();

			expect(() => {
				parser.parseCueData([
					['1', '00:01:51,443 --> 00:01:48,108', 'Text']
				]);
			}).toThrowError();
		});

		test('Throw error if the start time is the same as the end time', () => {
			const parser = new Parser();

			expect(() => {
				parser.parseCueData([['1', '0 --> 0', 'Text']]);
			}).toThrowError();
		});
	});
});
