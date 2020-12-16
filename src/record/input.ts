import Emitter from '../emitter'
import { BlockedOpts, EventType, InputChangeEvent } from '../types'
import { addEventListener, isBlocked } from '../utils/dom'

const recordInputs = (bOpts: BlockedOpts, emitter: Emitter) => {
  // TODO Throttle
  const cb = emitInputEvent(bOpts, emitter)
  return addEventListener('input', cb)
}

const emitInputEvent = (bOpts: BlockedOpts, emitter: Emitter) => (
  e: InputEvent
) => {
  const el = e.target as HTMLInputElement
  if (!el) return
  const blocked = isBlocked(el, bOpts)
  if (blocked) return
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
