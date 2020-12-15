import { mocked } from 'ts-jest/utils'
import Emitter from '../emitter'
import EventStorage from '../event/storage'
import { ClickEvent, EventType } from '../types'
import recordClicks from './click'

jest.mock('../emitter')

const storage = new EventStorage()
const emitter = mocked(new Emitter(storage))

describe('recordClicks', () => {
  beforeAll(() => recordClicks(emitter))
  afterEach(() => emitter.emit.mockReset())

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
    expect(emitter.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('does not emit when click not fired', () => {
    const btn = document.createElement('button')
    btn.disabled = true
    document.body.append(btn)
    btn.click()
    expect(emitter.emit).not.toBeCalled()
  })
})