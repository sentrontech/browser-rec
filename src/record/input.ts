import getEmitterInstance from '../emitter'
import { EventType, InputChangeEvent } from '../types'
import { addEventListener, isBlocked } from '../utils/dom'

const recordInputs = () => {
  // TODO Throttle
  return addEventListener('input', emitInputEvent)
}

const emitInputEvent = (e: InputEvent) => {
  const emitter = getEmitterInstance()
  if (!e.target) return
  const el = e.target as HTMLInputElement
  if (isBlocked(el)) return
  if (!el) return
  const outEvent = generateEvent(el)
  emitter.emit(EventType.Click, outEvent)
}

const generateEvent = (el: HTMLInputElement): InputChangeEvent => {
  return {
    eventType: EventType.Click,
    data: {
      type: el.getAttribute('type') || 'unknown',
      value: el.value
    }
  }
}
export default recordInputs