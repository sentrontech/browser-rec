import { EventListenerOpts } from '../types'

export function addEventListener<E extends Event>(
  event: string,
  fn: (evt: E) => void,
  target: Document = document,
  opts: EventListenerOpts = { capture: true, passive: true }
) {
  return target.addEventListener(event, fn as (evt: Event) => void, opts)
}

export const isBlocked = (
  el: HTMLElement | HTMLInputElement,
  blockedClasses: string[] = [],
  blockedTags: string[] = []
) => {
  let blocked = false
  // TODO Figure out if better iterate classList first
  blocked = blockedClasses.some(cls => el.classList.contains(cls))
  if (blocked) return true
  console.log('BT', blockedTags, el.tagName)
  blocked = blockedTags.some(tag => el.tagName.toLowerCase() === tag.toLowerCase())
  console.log('blocked', blocked)
  if (blocked) return true
  return blocked
}