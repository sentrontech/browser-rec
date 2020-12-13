import { EventOpts } from '../types'

export function addEventListener<E extends Event>(
  event: string,
  fn: (evt: E) => void,
  target: Document = document,
  opts: EventOpts = { capture: true, passive: true }
) {
  return target.addEventListener(event, fn as (evt: Event) => void, opts)
}

export function cssPath(el: HTMLElement) {
  /* 
    cssPath is used for visual and display purposes only.
    This means that edge cases, i.e. duplicate id attributes are okay.
    This also means we try to find common attributes for the css path, like `name`
    We are not using this to pin point a specific element at a later time.
  */
  const CSSPATH_TARGET_LENGTH = 50
  const SEEKABLE_ATTRS = ['name', 'type']
  if (el.id) return `#${el.id}`
  if (el.tagName.toLowerCase() === 'body') return 'body'

  let cssPath = []
  let currentEl: HTMLElement = el
  let cssPathLength = 0
  while (cssPathLength <= CSSPATH_TARGET_LENGTH) {
    cssPath.push([currentEl].reduce((str, el) => {
      if (el.className.length) {
        return str + [...el.className.split(' ')].map(c => `.${c}`).join('')
      }
      for (const attr of SEEKABLE_ATTRS) {
        // only returns one attribute deliberately
        if (el.getAttribute(attr)) {
          return `${str}[${attr}=${el.getAttribute(attr)}]`
        }
      }
      return str
    }, currentEl.tagName.toLowerCase()))

    cssPathLength = cssPathLength + cssPath[cssPath.length - 1].length
    if (!currentEl.parentElement || currentEl.parentElement.tagName.toLowerCase() === 'body') {
      break 
    } else {
      currentEl = currentEl.parentElement
    }
  }
  return cssPath.reverse().join(' > ')
}