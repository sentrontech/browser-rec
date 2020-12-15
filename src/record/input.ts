import Emitter from '../emitter'
import { EventType, InputChangeEvent, StartOpts } from '../types'
import { addEventListener, isBlocked } from '../utils/dom'

const recordInputs = (emitter: Emitter, opts: StartOpts) => {
  // TODO Throttle
  const cb = emitInputEvent(emitter, opts)
  return addEventListener('input', cb)
}

const emitInputEvent = (emitter: Emitter, opts: StartOpts) => (e: InputEvent) => {
  const el = e.target as HTMLInputElement
  if (!el) return
  if (opts.blockedClasses || opts.blockedTags) {
    const blocked = isBlocked(el, opts.blockedClasses, opts.blockedTags)
    if (blocked) return
  }
  const outEvent = generateEvent(el)
  emitter.emit(EventType.Input, outEvent)
}

const generateEvent = (el: HTMLInputElement): InputChangeEvent => {
  return {
    eventType: EventType.Input,
    data: {
      type: el.getAttribute('type') || 'unknown',
      value: el.value
    }
  }
}
export default recordInputs