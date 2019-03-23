import resolve from "rollup-plugin-node-resolve";
import commonjs from "rollup-plugin-commonjs";
import babel from "rollup-plugin-babel";
import pkg from "./package.json";
import { uglify } from 'rollup-plugin-uglify'
import postcss from 'rollup-plugin-postcss'

export default {
  input: "./src/components/Tabs/index.js",
  output: {
    name: "react-swipeable-tab",
    file: pkg.main,
    format: "umd",
  },
  plugins: [
    postcss(),
    babel({
      babelrc: false,
      exclude: 'node_modules/**',
      presets: [ [ '@babel/env', { modules: false } ], '@babel/react' ],
      plugins: ['@babel/plugin-proposal-class-properties']
    }),
    resolve(), // so Rollup can find `ms`
    commonjs(), // so Rollup can convert `ms` to an ES module
    uglify({
      output: {
        preamble: `/* eslint-disable */`
      }
    })
  ],
  external: [
    'react'
  ],
};
