import typescript from 'rollup-plugin-typescript';

export default {
    input: 'source/index.ts',
    output: {
        file: 'dist/subtitle-parsing-tool.js',
        format: 'cjs'
    },
    plugins: [
        typescript()
    ]
};
