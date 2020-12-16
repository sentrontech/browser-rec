import Emitter from '../emitter'
import { ListenedEvt, Opts, Resetable } from '../types'
import { removeEventListener } from '../utils/dom'
import recordClicks from './click'
import recordConsole from './console'
import recordInputs from './input'


export default class Recorder {
  emitter: Emitter
  opts: Opts
  listenedEvts: ListenedEvt<Event>[] = []
  resetFns: Resetable[] = []

  constructor(opts: Opts, emitter: Emitter) {
    this.opts = opts
    this.emitter = emitter
  }

  start = () => {
    this.listenedEvts = [
      recordClicks(this.emitter),
      recordInputs(this.opts.blocked, this.emitter),
    ]
    this.resetFns = [
      recordConsole(this.emitter)
    ]

  }

  stop = () => {
    this.listenedEvts.forEach(removeEventListener)
    this.resetFns.forEach(fn => fn && fn.reset())
  }
}
