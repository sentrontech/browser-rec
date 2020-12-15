import { EventEmitter } from 'events'
import EventStorage from './event/storage'
import { ClickEvent, ConsoleEvent, EmittedEvent, EventType } from './types'

export default class Emitter extends EventEmitter {
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