import { Opts, StartOpts } from '../types'

export const getDefaultOpts = (startOpts: StartOpts): Opts => ({
  pollMs: 5000,
  blocked: {
    classes: [],
    tags: []
  },
  ...startOpts
})

export const version = () =>
  Object.freeze({
    VERSION: process.env.VERSION,
    BUILD_TS: process.env.BUILD_TS
  })
