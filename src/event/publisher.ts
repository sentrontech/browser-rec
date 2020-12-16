import Recorder from '../record'
import { EventsDto, Opts } from '../types'
import { postJSON } from '../utils/fetch'
import EventStorage from './storage'

export default class EventPublisher {
  private RETRY_TIMES = 2
  private pollMs: number
  private interval: NodeJS.Timeout | null = null
  private endpoint: string
  private eventStorage: EventStorage
  private recorder: Recorder

  constructor(opts: Opts, eventStorage: EventStorage, recorder: Recorder) {
    this.endpoint = opts.endpoint
    this.pollMs = opts.pollMs
    this.eventStorage = eventStorage
    this.recorder = recorder
  }

  start = () => {
    this.interval = setInterval(this.publish, this.pollMs)
  }

  stop = () => {
    if (!this.interval) return
    clearInterval(this.interval)
    // Stop recording events
    this.recorder.stop()
  }

  publish = async () => {
    const events = this.eventStorage.getBatch()
    if (!events.length) return

    // Try to publish a few times
    let error
    for (let i = 0; i < this.RETRY_TIMES; i++) {
      try {
        return await postJSON(`${this.endpoint}api/events`, {
          events
        } as EventsDto)
      } catch (e) {
        error = e
      }
    }

    // If we failed to retry stop polling and throw
    this.stop()
    throw error
  }
}
