import { ClickEvent, EventType } from '../types'
import recordClicks from './click'

const emitterMock = {
  emit: jest.fn()
}

jest.mock('../emitter', () => {
  return () => emitterMock
})


describe('recordClicks', () => {
  beforeAll(recordClicks)
  afterEach(() => emitterMock.emit.mockReset())

  it('emits correct eventType and data', () => {
    document.body.click()
    const eventType = EventType.Click
    const out: ClickEvent = {
      eventType,
      data: {
        cssPath: 'body',
        x: 0,
        y: 0,
      }
    }
    expect(emitterMock.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('does not emit when click not fired', () => {
    const btn = document.createElement('button')
    btn.disabled = true
    document.body.append(btn)
    btn.click()
    expect(emitterMock.emit).not.toBeCalled()
  })
})