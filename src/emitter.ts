import { EventEmitter } from 'events'
import EventStorage from './event/storage'
import {
  ClickEvent,
  ConsoleEvent,
  EmittedEvent,
  EventType,
  InputChangeEvent
} from './types'

export default class Emitter extends EventEmitter {
  eventStorage: EventStorage
  seqNo: number = 1

  constructor(eventStorage: EventStorage) {
    super()
    this.eventStorage = eventStorage
  }

  start = () => {
    this.on(EventType.Click, this.handleClick)
    this.on(EventType.Input, this.handleInput)
    this.on(EventType.Console, this.handleConsole)
  }

  handleClick = (e: ClickEvent) => {
    this.eventStorage.append(
      this._addMeta(e)
    )
  }

  handleInput = (e: InputChangeEvent) => {
    this.eventStorage.append(
      this._addMeta(e)
    )
  }

  handleConsole = (e: ConsoleEvent) => {
    // NOTE: do *not* put `console.<log|error>` code here as it will re-trigger this event
    this.eventStorage.append(
      this._addMeta(e)
    )
  }

  _addMeta = (e: EmittedEvent) => {
    e.ts = Date.now()
    e.seqNo = this.seqNo++
    return e
  }

}