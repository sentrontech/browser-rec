import { cssPath } from './css-path'

describe('cssPath', () => {
  it('returns body if body', () => {
    const path = cssPath(document.body)
    expect(path).toEqual('body')
  })

  it('returns id attribute as path', () => {
    const outer = document.createElement('div')
    outer.className = 'inner'
    const btn = document.createElement('button')
    btn.id = 'a-proper-id'
    outer.append(btn)
    document.body.append(outer)
    const path = cssPath(btn)
    expect(path).toEqual('#a-proper-id')
    expect(path).not.toContain('inner')
  })

  it('returns path with parent classes', () => {
    const outer = document.createElement('div')
    outer.className = 'outer'
    const inner = document.createElement('div')
    inner.className = 'inner another-inner'
    const btn = document.createElement('button')
    btn.className = 'btn'
    inner.append(btn)
    outer.append(inner)
    document.body.append(outer)
    const path = cssPath(btn)
    expect(path).toEqual('div.outer > div.inner.another-inner > button.btn')
  })

  it('returns path with 50 character target', () => {
    const outer = document.createElement('div')
    outer.className = 'outer'
    const inner = document.createElement('div')
    // 50 characters added
    inner.className = `${Array(50).fill('x').join(' ')}`
    const btn = document.createElement('button')
    btn.className = 'btn'
    inner.append(btn)
    outer.append(inner)
    document.body.append(outer)
    const path = cssPath(btn)
    // outer is not added as our limit is hit by the inner div
    expect(path).not.toContain('outer')
  })

  it('returns path only 2 parent nodes up', () => {
    const outer = document.createElement('div')
    outer.className = 'outer'
    const middle = document.createElement('div')
    middle.className = 'middle'
    const inner = document.createElement('div')
    inner.className = 'inner'
    const btn = document.createElement('button')
    btn.className = 'btn'
    inner.append(btn)
    middle.append(inner)
    outer.append(middle)
    document.body.append(outer)
    const path = cssPath(btn)
    expect(path).toEqual('div.middle > div.inner > button.btn')
    expect(path).not.toEqual('outer')
  })

  describe('using attributes', () => {
    it('returns path with type attribute when no class', () => {
      const outer = document.createElement('div')
      outer.className = 'outer'
      const inner = document.createElement('input')
      inner.setAttribute('type', 'password')
      outer.append(inner)
      document.body.append(outer)
      const path = cssPath(inner)
      expect(path).toEqual('div.outer > input[type=password]')
    })

    it('returns path with name attribute when no class', () => {
      const outer = document.createElement('div')
      outer.className = 'outer'
      const inner = document.createElement('input')
      inner.setAttribute('name', 'a-name')
      outer.append(inner)
      document.body.append(outer)
      const path = cssPath(inner)
      expect(path).toEqual('div.outer > input[name=a-name]')
    })

    it('returns path from class instead of attribute', () => {
      const outer = document.createElement('div')
      outer.className = 'outer'
      const inner = document.createElement('input')
      inner.className = 'inner'
      inner.setAttribute('type', 'password')
      outer.append(inner)
      document.body.append(outer)
      const path = cssPath(inner)
      expect(path).not.toContain('input[type=password]')
      expect(path).toEqual('div.outer > input.inner')
    })
  })
})