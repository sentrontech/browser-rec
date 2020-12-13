import { ClickEvent, ConsoleEvent, ConsoleMethod, EventType } from '../types'
import recordConsole from './console'

const emitterMock = {
  emit: jest.fn()
}

jest.mock('../emitter', () => {
  return () => emitterMock
})


describe('recordConsole', () => {
  beforeAll(recordConsole)
  afterEach(() => emitterMock.emit.mockReset())

  it('emits correct eventType and data', () => {
    console.log('a log message')
    const eventType = EventType.Console
    const out: ConsoleEvent = {
      eventType,
      data: {
        method: ConsoleMethod.Log,
        args: ['a log message']
      }
    }
    expect(emitterMock.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('emits full arguments with formatters', () => {
    console.log('A tomato is %cred!', 'background: red; color: white')
    const eventType = EventType.Console
    const out: ConsoleEvent = {
      eventType,
      data: {
        method: ConsoleMethod.Log,
        args: ['A tomato is %cred!', 'background: red; color: white']
      }
    }
    expect(emitterMock.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('emits for relevant console methods', () => {
    console.debug('debug message')
    console.info('info message')
    console.warn('warn message')
    console.log('log message')
    console.error('error message')
    expect(emitterMock.emit).toHaveBeenCalledTimes(5)
  })

  it('does not emit when no relevant console methods fired', () => {
    console.dir({foo: 'bar'})
    console.count('foo')
    console.assert(true, 'a true assertion')
    expect(emitterMock.emit).not.toBeCalled()
  })
})