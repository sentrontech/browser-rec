import { EventOpts } from '../types'

export function addEventListener<E extends Event>(
  event: string,
  fn: (evt: E) => void,
  target: Document = document,
  opts: EventOpts = { capture: true, passive: true }
) {
  return target.addEventListener(event, fn as (evt: Event) => void, opts)
}