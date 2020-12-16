export function cssPath(el: HTMLElement) {
  /* 
    cssPath is used for visual and display purposes only.
    This means that edge cases, i.e. duplicate id attributes are okay.
    This also means we try to find common attributes for the css path, like `name`
    We are not using this to pin point a specific element at a later time.
  */

  // TODO Only go up ~3 parentNodes high
  const CSSPATH_TARGET_LENGTH = 50
  const PARENT_JUMP_LIMIT = 2
  if (el.id) return `#${el.id}`
  if (el.tagName.toLowerCase() === 'body') return 'body'

  let cssPath = []
  let currentEl: HTMLElement = el
  let cssPathLength = 0
  let parentsJumped = 0
  while (
    cssPathLength <= CSSPATH_TARGET_LENGTH &&
    parentsJumped <= PARENT_JUMP_LIMIT
  ) {
    cssPath.push(cssPathForEl(currentEl))
    cssPathLength = cssPathLength + cssPath[cssPath.length - 1].length

    const parent = currentEl.parentElement
    if (!parent || parent.tagName.toLowerCase() === 'body') {
      break
    } else {
      currentEl = parent
      parentsJumped++
    }
  }
  return cssPath.reverse().join(' > ')
}

const cssPathForEl = (el: HTMLElement) => {
  const methods = [byClassName, byAttribute]
  let cssPath = el.tagName.toLowerCase()
  for (const m of methods) {
    const foundCssPath = m(el)
    if (foundCssPath) return cssPath + foundCssPath
  }
  return cssPath
}

const byClassName = (el: HTMLElement) => {
  if (!el.className.length) return false
  return [...el.className.split(' ')].map((c) => `.${c}`).join('')
}

const byAttribute = (el: HTMLElement) => {
  const SEEKABLE_ATTRS = ['name', 'type']
  for (const attr of SEEKABLE_ATTRS) {
    // only returns one attribute deliberately
    const val = el.getAttribute(attr)
    if (val) return `[${attr}=${val}]`
  }
  return false
}
