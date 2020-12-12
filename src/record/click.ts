import getEmitterInstance from '../emitter'
import { EventType, ClickEvent } from '../types'
import { addEventListener } from '../utils/dom'

const recordClicks = () => {
  return addEventListener('click', emitClickEvent)
}

const emitClickEvent = (e: MouseEvent) => {
  const emitter = getEmitterInstance()
  if (!e.target) return
  const el = e.target as HTMLElement
  if (!el) return
  const outEvent = generateEvent(el, e)
  emitter.emit(EventType.Click, outEvent)
}

const generateEvent = (el: HTMLElement, e: MouseEvent): ClickEvent => {
  return {
    eventType: EventType.Click,
    el,
    data: {
      x: e.clientX,
      y: e.clientY
    }
  }
}
export default recordClicks