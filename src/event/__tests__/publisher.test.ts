import { mocked } from 'ts-jest/utils'
import { EventType, Opts } from '../../types'
import EventPublisher from '../publisher'
import EventStorage from '../storage'
import { postJSON as _postJSON } from '../../utils/fetch'
import Recorder from '../../record'
import Emitter from '../../emitter'
import { getDefaultOpts } from '../../utils'

jest.mock('../../utils/fetch')
const postJSON = mocked(_postJSON)

const anEvent = {
  eventType: EventType.Click,
  data: {
    cssPath: '#id',
    x: 0,
    y: 0
  }
}

const opts: Opts = getDefaultOpts({
  clientCode: '123',
  endpoint: 'http://localhost:9999/',
  pollMs: 100
})

let eventPublisher: EventPublisher
let eventStorage: EventStorage
let recorder: Recorder

describe('EventPublisher', () => {
  beforeEach(() => jest.useFakeTimers())

  beforeEach(() => {
    eventStorage = new EventStorage()
    const emitter = new Emitter(eventStorage)
    recorder = new Recorder(opts, emitter)
    eventPublisher = new EventPublisher(opts, eventStorage, recorder)
  })

  afterEach(() => {
    eventStorage.getBatch() // clear events
    eventPublisher.stop()
    jest.clearAllTimers()
    jest.resetAllMocks()
  })

  describe('start', () => {
    let publish: any

    beforeEach(() => {
      publish = jest.spyOn(eventPublisher, 'publish')
      eventPublisher.start()
      eventStorage.append(anEvent)
    })

    it('calls publish when interval passed', () => {
      jest.advanceTimersByTime(101)
      expect(publish).toHaveBeenCalled()
    })

    it('does not call publish when interval not passed', () => {
      jest.advanceTimersByTime(99)
      expect(publish).not.toHaveBeenCalled()
    })
  })

  describe('stop', () => {
    it('clears interval', () => {
      eventPublisher.start()
      eventPublisher.stop()
      expect(clearInterval).toHaveBeenCalledWith(expect.any(Number))
    })

    it('stops recording', () => {
      const recorderStop = jest.spyOn(recorder, 'stop')
      eventPublisher.start()
      eventPublisher.stop()
      expect(recorderStop).toHaveBeenCalled()
    })

    it('does not call publish any more events', () => {
      const publish = jest.spyOn(eventPublisher, 'publish')
      eventPublisher.start()
      eventStorage.append(anEvent)
      eventPublisher.stop()
      jest.advanceTimersByTime(101)
      expect(publish).not.toHaveBeenCalled()
    })
  })

  describe('publish', () => {
    it('posts if events', async () => {
      eventStorage.append(anEvent)
      await eventPublisher.publish()
      expect(postJSON).toHaveBeenCalledWith(
        'http://localhost:9999/api/events',
        { events: [anEvent] }
      )
    })

    it('does not post if no events', async () => {
      await eventPublisher.publish()
      expect(postJSON).not.toHaveBeenCalled()
    })

    it('throws after 2 retries', async () => {
      eventStorage.append(anEvent)
      postJSON.mockRejectedValue('some issue POSTing')
      try {
        await eventPublisher.publish()
      } catch (e) {
        expect(postJSON).toHaveBeenCalledTimes(2)
        expect(e).toBe('some issue POSTing')
      }
    })

    it('does not throw if retried successfully', async () => {
      eventStorage.append(anEvent)
      postJSON.mockRejectedValueOnce('some issue POSTing')
      await eventPublisher.publish()
      expect(postJSON).toHaveBeenCalledTimes(2)
      expect(postJSON).toHaveBeenCalledWith(
        'http://localhost:9999/api/events',
        { events: [anEvent] }
      )
    })
  })
})
