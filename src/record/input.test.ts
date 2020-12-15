import { mocked } from 'ts-jest/utils'
import Emitter from '../emitter'
import EventStorage from '../event/storage'
import { InputChangeEvent, EventType, StartOpts } from '../types'
import recordInputs from './input'

jest.mock('../emitter')

const storage = new EventStorage()
const emitter = mocked(new Emitter(storage))

const opts: StartOpts = {
  clientCode: '123',
  endpoint: 'http://localhost:9999/',
  blockedClasses: ['foo', 'bar']
}

describe('recordInputs', () => {
  beforeAll(() => recordInputs(emitter, opts))
  afterEach(() => {
    emitter.emit.mockReset()
  })

  it('emits correct eventType and data', () => {
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
    expect(emitter.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('does not emit input unless event called', () => {
    createInput('text', 'input value')
    expect(emitter.emit).not.toBeCalled()
  })
})

describe('blocked recordInputs', () => {
  it('does not emit when input has blocked class', () => {
    recordInputs(emitter, opts)
    const input = createInput('text', 'input value')
    input.classList.add('foo')
    input.dispatchEvent(new Event('input'))
    expect(emitter.emit).not.toBeCalled()
  })
  
  xit('does not emit when input has blocked tag', () => {
    const optsWithTags: StartOpts = {
      ...opts,
      blockedTags: ['input']
    }
    recordInputs(emitter, optsWithTags)
    const input = createInput('text', 'input value')
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