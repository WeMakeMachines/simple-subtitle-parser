import typescript from 'rollup-plugin-typescript';
import { uglify } from 'rollup-plugin-uglify';

export default {
    input: 'source/index.ts',
    output: {
        file: 'dist/subtitle-parsing-tool.js',
        format: 'cjs'
    },
    plugins: [
        typescript(),
        uglify()
    ]
};
