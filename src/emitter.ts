import { EventEmitter } from 'events'
import EventStorage from './event/storage'
import { ClickEvent, ConsoleEvent, EmittedEvent, EventType, StartOpts } from './types'

class Emitter extends EventEmitter {
  opts: StartOpts
  eventStorage: EventStorage

  constructor(opts: StartOpts, eventStorage: EventStorage) {
    super()
    this.opts = opts
    this.eventStorage = eventStorage
  }

  start = () => {
    this.on(EventType.Click, this.handleClick)
    this.on(EventType.Console, this.handleConsole)
  }

  handleClick = (e: ClickEvent) => {
    this.eventStorage.append(
      this._addTs(e)
    )
  }

  handleConsole = (e: ConsoleEvent) => {
    // Note do not put `console.<log|error>` code here as it will re-trigger this event
    this.eventStorage.append(
      this._addTs(e)
    )
  }

  _addTs = (e: EmittedEvent) => {
    e.ts = Date.now()
    return e
  }
}

let emitter: Emitter
export default function getEmitterInstance (
  opts?: StartOpts,
  eventStorage?: EventStorage
): Emitter {
  if (emitter) return emitter
  if (opts && eventStorage) {
    emitter = new Emitter(opts, eventStorage)
    return emitter
  }
  // TODO custom error
  throw new Error('specify options when creating instance of emitter')
}