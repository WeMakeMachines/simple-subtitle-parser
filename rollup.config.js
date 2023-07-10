import terser from '@rollup/plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
	input: 'source/index.ts',
	output: {
		file: 'dist/simple-subtitle-parser.js',
		format: 'es',
		exports: 'default'
	},
	plugins: [typescript(), terser()]
};
