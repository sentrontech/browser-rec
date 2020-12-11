import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'umd',
    }
  ],
  plugins: [
    typescript(),
    nodePolyfills(),
    terser()
  ]
}
