import { EventsDto, StartOpts } from '../types'
import { postJSON } from '../utils/fetch'
import EventStorage from './storage'

export default class EventPublisher {
  private pollMs = 5000
  private interval: NodeJS.Timeout | null = null
  private endpoint: string
  private eventStorage: EventStorage

  constructor(opts: StartOpts, eventStorage: EventStorage) {
    this.endpoint = opts.endpoint
    this.pollMs = opts.pollMs || this.pollMs
    this.eventStorage = eventStorage
  }

  start = () => {
    this.interval = setInterval(this.publish, this.pollMs)
  }

  stop = () => {
    if (!this.interval) return
    clearInterval(this.interval)
  }

  private publish = async () => {
    const events = this.eventStorage.getBatch()
    if (!events.length) return
    // TODO contingency when events could not be posted
    await postJSON(
      `${this.endpoint}api/events`,
      { events } as EventsDto
    )
  }

}