import { Opts, StartOpts } from '../types'

export const getDefaultOpts = (startOpts: StartOpts): Opts => ({
  pollMs: 5000,
  blocked: {
    classes: [],
    tags: []
  },
  ...startOpts
})