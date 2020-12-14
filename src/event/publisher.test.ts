import { EventType, StartOpts } from '../types'
import EventPublisher from './publisher'
import EventStorage from './storage'
import { postJSON as _postJSON} from '../utils/fetch'
jest.mock('../utils/fetch')
const postJSON = _postJSON as jest.Mock

describe('EventPublisher', () => {
  beforeAll(() => jest.useFakeTimers())
  afterEach(() => {
    jest.clearAllTimers()
    postJSON.mockReset()
  })

  it('publishes when interval passed', () => {
    const eventStorage = new EventStorage()
    eventStorage.append(anEvent)
    const eventPublisher = new EventPublisher(opts, eventStorage)
    eventPublisher.start()
    jest.advanceTimersByTime(101)
    expect(postJSON).toHaveBeenCalledWith(
      "http://localhost:9999/api/events",
      { events: [anEvent]}
    )
  })

  it('does not publish when interval not passed', () => {
    const eventStorage = new EventStorage()
    eventStorage.append(anEvent)
    const eventPublisher = new EventPublisher(opts, eventStorage)
    eventPublisher.start()
    jest.advanceTimersByTime(99)
    expect(postJSON).not.toHaveBeenCalled()
  })

  it('does not publish if no events', () => {
    const eventStorage = new EventStorage()
    const eventPublisher = new EventPublisher(opts, eventStorage)
    eventPublisher.start()
    jest.advanceTimersByTime(101)
    expect(postJSON).not.toHaveBeenCalled()
  })
})

const anEvent = {
  eventType: EventType.Click,
  data: {
    cssPath: '#id',
    x: 0,
    y: 0
  }
}

const opts: StartOpts = {
  clientCode: '123',
  endpoint: 'http://localhost:9999/',
  pollMs: 100
}