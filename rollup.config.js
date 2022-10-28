import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from "rollup-plugin-terser"

export default {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/sliderCaptcha.cjs.js',
      format: 'cjs',
      // compact: true
    },
    {
      file: 'dist/sliderCaptcha.es.js',
      format: 'es',
       // compact: true
    },
    {
      file: 'dist/sliderCaptcha.iife.js',
      format: 'iife',
      name: 'SliderCaptcha',
      // compact: true
    }
  ],
  plugins: [
      resolve(),  // 这样 Rollup 能找到 `ms`
      commonjs(), // 这样 Rollup 能转换 `ms` 为一个ES模块
      // terser(), // 生产环境下压缩代码
      babel({ babelHelpers: 'bundled' })
  ]
};