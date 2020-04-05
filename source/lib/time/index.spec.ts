import { timeValuesToMilliseconds } from './';

describe('time library', () => {
	describe('timeValuesToMilliseconds', () => {
		test('should return 0 if no values are provided', () => {
			const result = timeValuesToMilliseconds({});

			expect(result).toEqual(0);
		});

		test('should return 900 for an object of 900 milliseconds', () => {
			const result = timeValuesToMilliseconds({
				milliseconds: 900
			});

			expect(result).toEqual(900);
		});

		test('should return 1000 for an object of 1 seconds', () => {
			const result = timeValuesToMilliseconds({
				seconds: 1
			});

			expect(result).toEqual(1000);
		});

		test('should return 1900 for an object of 900 milliseconds and 1 second', () => {
			const result = timeValuesToMilliseconds({
				milliseconds: 900,
				seconds: 1
			});

			expect(result).toEqual(1900);
		});

		test('should return 60000 for an object of 1 minute', () => {
			const result = timeValuesToMilliseconds({
				minutes: 1
			});

			expect(result).toEqual(60000);
		});

		test('should return 3600000 for an object of 1 hour', () => {
			const result = timeValuesToMilliseconds({
				hours: 1
			});

			expect(result).toEqual(3600000);
		});
	});
});
