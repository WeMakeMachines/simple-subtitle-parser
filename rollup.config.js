import typescript from 'rollup-plugin-typescript';

export default {
    input: 'source/index.ts',
    output: {
        file: 'lib/subtitle-parsing-tool.js',
        format: 'cjs'
    },
    plugins: [
        typescript()
    ]
};
