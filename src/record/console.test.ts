import { mocked } from 'ts-jest/utils'
import Emitter from '../emitter'
import EventStorage from '../event/storage'
import { ConsoleEvent, ConsoleMethod, EventType } from '../types'
import recordConsole from './console'


jest.mock('../emitter')

const storage = new EventStorage()
const emitter = mocked(new Emitter(storage))


describe('recordConsole', () => {
  beforeAll(() => recordConsole(emitter))
  afterEach(() => emitter.emit.mockReset())

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
    expect(emitter.emit).toHaveBeenCalledWith(eventType, out)
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
    expect(emitter.emit).toHaveBeenCalledWith(eventType, out)
  })

  it('emits for relevant console methods', () => {
    console.debug('debug message')
    console.info('info message')
    console.warn('warn message')
    console.log('log message')
    console.error('error message')
    expect(emitter.emit).toHaveBeenCalledTimes(5)
  })

  it('does not emit when no relevant console methods fired', () => {
    console.dir({foo: 'bar'})
    console.count('foo')
    console.assert(true, 'a true assertion')
    expect(emitter.emit).not.toBeCalled()
  })
})