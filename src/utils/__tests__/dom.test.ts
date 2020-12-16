import { BlockedOpts } from '../../types'
import { isBlocked } from '../dom'

let input: HTMLInputElement
let textarea: HTMLTextAreaElement

describe('isBlocked', () => {
  beforeEach(() => {
    input = document.createElement('input')
    textarea = document.createElement('textarea')
  })

  it('blocks if classname match', () => {
    input.classList.add('foo')
    expect(isBlocked(input, { classes: ['foo'] })).toBe(true)
    input.classList.add('bar')
    expect(isBlocked(input, { classes: ['bar'] })).toBe(true)
    expect(isBlocked(input, { classes: ['bar', 'foo'] })).toBe(true)
  })

  it('blocks if tag name match', () => {
    expect(isBlocked(textarea, { tags: ['textarea'] })).toBe(true)
    expect(isBlocked(input, { tags: ['input'] })).toBe(true)
  })

  it('does not block if class name doesnt match', () => {
    expect(isBlocked(input, { classes: [] })).toBe(false)
    input.classList.add('zzz')
    expect(isBlocked(input, { classes: ['foo', 'bar'] })).toBe(false)
  })

  it('does not block if tag doesnt match', () => {
    expect(isBlocked(textarea, { tags: ['input'] })).toBe(false)
    expect(isBlocked(input, { tags: ['textarea'] })).toBe(false)
  })

  it('blocks if classname match on any parent', () => {
    const outer = document.createElement('div')
    outer.classList.add('foo')
    const inner = document.createElement('div')
    inner.append(input)
    outer.append(inner)
    document.body.append(outer)
    /*
    <div class="foo">
      <div>
        <input />
      </div>
    </div>
    */
    expect(isBlocked(input, { classes: ['foo'] })).toBe(true)
  })

  it('blocks if input type is password', () => {
    input.type = 'password'
    document.body.append(input)
    expect(isBlocked(input)).toBe(true)
  })
})
