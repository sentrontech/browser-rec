import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import nodePolyfills from 'rollup-plugin-node-polyfills'
import injectProcessEnv from 'rollup-plugin-inject-process-env'
import pkg from './package.json'

export default {
  input: 'src/index.ts',
  output: [
    {
      name: pkg.name,
      file: pkg.main,
      format: 'umd' // could have been iife
    }
  ],
  plugins: [
    typescript(),
    nodePolyfills(),
    injectProcessEnv(
      {
        BUILD_TS: Date.now(),
        VERSION: pkg.version
      },
      { exclude: 'node_modules' }
    ),
    terser()
  ]
}
