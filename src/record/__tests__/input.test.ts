import { mocked } from 'ts-jest/utils'
import Emitter from '../../emitter'
import EventStorage from '../../event/storage'
import { InputChangeEvent, EventType, ListenedEvt, BlockedOpts } from '../../types'
import { removeEventListener } from '../../utils/dom'
import recordInputs from '../input'

jest.mock('../../emitter')

const storage = new EventStorage()
let emitter = mocked(new Emitter(storage))

const opts: BlockedOpts = {}

let listenedEvt: ListenedEvt<Event>
describe('recordInputs', () => {
  beforeEach(() => emitter.emit.mockClear())

  afterEach(() => {
    removeEventListener(listenedEvt)
  })

  it('emits correct eventType and data', () => {
    listenedEvt = recordInputs(opts, emitter)
    const input = createInput('text', 'input value')
    input.dispatchEvent(new Event('input'))
    const eventType = EventType.Input
    const out: InputChangeEvent = {
      eventType,
      data: {
        type: 'text',
        value: 'input value'
      }
    }
    expect(emitter.emit).toHaveBeenCalledTimes(1)
    expect(emitter.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('does not emit input unless event called', () => {
    listenedEvt = recordInputs(opts, emitter)
    createInput('text', 'input value')
    expect(emitter.emit).not.toBeCalled()
  })

  it('does not emit when input has blocked class', () => {
    const blockedOpts = { classes: ['foo', 'bar'] }
    listenedEvt = recordInputs(blockedOpts, emitter)
    const input = createInput('password', 'input value1')
    input.classList.add('foo')
    input.dispatchEvent(new Event('input'))
    expect(emitter.emit).not.toBeCalled()
  })

  it('does not emit when input has blocked tag', () => {
    const blockedOpts = { tags: ['input'] }
    listenedEvt = recordInputs(blockedOpts, emitter)
    const input = createInput('text', 'input value2')
    input.dispatchEvent(new Event('input'))
    expect(emitter.emit).not.toBeCalled()
  })
})

const createInput = (type: string = 'text', value: string = '') => {
  const input = document.createElement('input')
  input.value = value
  input.setAttribute('type', type)
  document.body.append(input)
  return input
}
