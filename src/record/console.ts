import Emitter from '../emitter'
import { ConsoleEvent, EventType, ConsoleMethod } from '../types'

const recordConsole = (emitter: Emitter) => {
  if (!globalThis.console) return
  // NOTE: Only some console functionalities relevant for capture
  const methods: ConsoleMethod[] = [
    ConsoleMethod.Debug,
    ConsoleMethod.Info,
    ConsoleMethod.Warn,
    ConsoleMethod.Error,
    ConsoleMethod.Log,
  ]
  const console = globalThis.console as { [key: string]: any }
  methods.forEach((m: ConsoleMethod) => {
    if (!(m in globalThis.console)) return
    const original = console[m]
    console[m] = (...args: any[]) => {
      original.apply(console, args)
      const event: ConsoleEvent = {
        eventType: EventType.Console,
        data: {
          method: m,
          args
        }
      }
      emitter.emit(EventType.Console, event)
    }
  })
}

export default recordConsole