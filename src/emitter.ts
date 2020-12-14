import { EventEmitter } from 'events'
import EventStorage from './event/storage'
import { ClickEvent, ConsoleEvent, EmittedEvent, EventType } from './types'

class Emitter extends EventEmitter {
  eventStorage: EventStorage

  constructor(eventStorage: EventStorage) {
    super()
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
  eventStorage?: EventStorage
): Emitter {
  if (emitter) return emitter
  if (eventStorage) {
    emitter = new Emitter(eventStorage)
    return emitter
  }
  // TODO custom error
  throw new Error('specify options when creating instance of emitter')
}