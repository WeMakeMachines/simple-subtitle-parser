const terser = require("@rollup/plugin-terser");
const typescript = require("@rollup/plugin-typescript");
const pkg = require("./package.json");

module.exports = [
  {
    input: "source/index.ts",
    output: {
      file: pkg.main,
      format: "cjs",
      exports: "named",
    },
    plugins: [typescript(), terser()],
  },
  {
    input: "source/index.ts",
    output: {
      file: pkg.module,
      format: "es",
      exports: "named",
    },
    plugins: [typescript(), terser()],
  },
];
