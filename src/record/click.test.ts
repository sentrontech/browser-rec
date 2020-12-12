import { ClickEvent, EventType } from '../types'
import recordClicks from './click'

const emitterMock = {
  emit: jest.fn()
}

jest.mock('../emitter', () => {
  return () => emitterMock
})


describe('recordClicks', () => {
  afterEach(() => emitterMock.emit.mockReset())

  test('emits correct eventType and data', () => {
    recordClicks()
    document.body.click()
    const eventType = EventType.Click
    const out: ClickEvent = {
      eventType,
      el: document.body,
      data: {
        x: 0,
        y: 0,
      }
    }
    expect(emitterMock.emit).toHaveBeenCalledWith(eventType, out)
  })

  test('does not emit when click not fired', () => {
    recordClicks()
    const btn = document.createElement('button')
    btn.disabled = true
    document.body.append(btn)
    btn.click()
    expect(emitterMock.emit).not.toBeCalled()
  })
})