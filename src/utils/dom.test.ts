import { cssPath } from './dom'

describe('cssPath', () => {
  test('returns body if body', () => {
    const path = cssPath(document.body)
    expect(path).toEqual('body')
  })

  test('returns id attribute as path', () => {
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

  test('returns path with parent classes', () => {
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

  test('returns path with 50 character target', () => {
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

  describe('using attributes', () => {
    test('returns path with type attribute when no class', () => {
      const outer = document.createElement('div')
      outer.className = 'outer'
      const inner = document.createElement('input')
      inner.setAttribute('type', 'password')
      outer.append(inner)
      document.body.append(outer)
      const path = cssPath(inner)
      expect(path).toEqual('div.outer > input[type=password]')
    })

    test('returns path with name attribute when no class', () => {
      const outer = document.createElement('div')
      outer.className = 'outer'
      const inner = document.createElement('input')
      inner.setAttribute('name', 'a-name')
      outer.append(inner)
      document.body.append(outer)
      const path = cssPath(inner)
      expect(path).toEqual('div.outer > input[name=a-name]')
    })

    test('returns path from class instead of attribute', () => {
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