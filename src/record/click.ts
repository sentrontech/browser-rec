import Emitter from '../emitter'
import { EventType, ClickEvent } from '../types'
import { addEventListener } from '../utils/dom'
import { cssPath } from '../utils/css-path'

const recordClicks = (emitter: Emitter) => {
  const cb = emitClickEvent(emitter)
  return addEventListener('click', cb)
}

const emitClickEvent = (emitter: Emitter) => (e: MouseEvent) => {
  if (!e.target) return
  const el = e.target as HTMLElement
  if (!el) return
  const outEvent = generateEvent(el, e)
  emitter.emit(EventType.Click, outEvent)
}

const generateEvent = (el: HTMLElement, e: MouseEvent): ClickEvent => {
  return {
    eventType: EventType.Click,
    data: {
      cssPath: cssPath(el),
      x: e.clientX,
      y: e.clientY
    }
  }
}
export default recordClicks
