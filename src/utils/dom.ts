import { ListenedEvt, EventListenerOpts, BlockedOpts } from '../types'

export function addEventListener<E extends Event>(
  event: string,
  fn: (evt: E) => void,
  target: Document = document,
  opts: EventListenerOpts = { capture: true, passive: true }
): ListenedEvt<Event> {
  target.addEventListener(event, fn as (evt: Event) => void, opts)
  return { target, event, opts, fn: fn as (evt: Event) => void }
}

export function removeEventListener(
  { event, fn, target, opts }: ListenedEvt<Event>
): void {
  target.removeEventListener(event, fn, opts)
}

export function isBlocked (
  el: HTMLElement,
  bOpts: BlockedOpts = { classes: [], tags: [] }
): Boolean {
  const { classes = [], tags = [] } = bOpts
  const parent = el.parentElement
  
  if (el.getAttribute('type') === 'password') return true
  if (el.nodeType === document.nodeType) return false
  if ((!el.classList.length && !el.tagName) && parent) return isBlocked(parent, bOpts)
  if ((!el.classList.length && !el.tagName) && !parent) return false
  
  const checks = [
    () => classes.some(cls => el.classList.contains(cls)),
    () => tags.some(tag => el.tagName.toLowerCase() === tag.toLowerCase())
  ]
  if (checks.some(chk => chk())) return true

  if (parent) return isBlocked(parent, bOpts)
  return false
}