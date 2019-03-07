import analyze from 'rollup-plugin-analyzer';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import json from 'rollup-plugin-json';
import replace from 'rollup-plugin-replace';
import resolve from 'rollup-plugin-node-resolve';
import image from 'rollup-plugin-img';
import pkg from './package.json';

process.env.NODE_ENV = 'production';

const extensions = ['.js', '.jsx'];
const dependencies = Object.keys(pkg.dependencies);

export default {
  input:  'src/App.js',
  output:
    {
      file: 'lib/bundle.js',
      format: 'cjs', // Jest doesn't work with 'esm' right now, sadly.
    },
  external: [...dependencies],
  plugins: [
    babel({
      extensions,
      // https://github.com/rollup/rollup-plugin-babel#helpers
      runtimeHelpers: true,
    }),
    commonjs(),
    json(),
    replace({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) }),
    resolve({
      extensions,
      // customResolveOptions: {
      //   paths: [process.env.NODE_PATH],
      // },
    }),
    analyze(),
    image()
  ],
};
