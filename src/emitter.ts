import { EventEmitter } from 'events'
import { ClickEvent, ConsoleEvent, EventType, RecordConfig } from './types'

class Emitter extends EventEmitter {
  config: RecordConfig

  constructor(config: RecordConfig) {
    super()
    this.config = config
  }

  handleClick = (e: ClickEvent) => {
    // todo
  }

  handleConsole = (e: ConsoleEvent) => {
    // todo
  }
}

const setupEvents = (emitter: Emitter) => {
  emitter.on(EventType.Click, emitter.handleClick)
  emitter.on(EventType.Console, emitter.handleConsole)
}

let emitter: Emitter
export default function getEmitterInstance (config?: RecordConfig): Emitter {
  if (emitter) return emitter
  if (config) {
    emitter = new Emitter(config)
    setupEvents(emitter)
    return emitter
  }
  // TODO custom error
  throw new Error('specify config when creating instance of emitter')
}