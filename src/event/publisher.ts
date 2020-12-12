import { postJSON } from '../utils/fetch'
import EventStorage from './storage'

export default class EventPublisher {
  private PUBLISH_TIME_MS = 5000
  private interval: NodeJS.Timeout | null = null
  private endpoint: string
  private eventStorage: EventStorage

  constructor(endpoint: string, eventStorage: EventStorage) {
    this.endpoint = endpoint
    this.eventStorage = eventStorage
  }

  start = () => {
    this.interval = setInterval(this.publish, this.PUBLISH_TIME_MS)
  }

  stop = () => {
    if (!this.interval) return
    clearInterval(this.interval)
  }

  private publish = async () => {
    const events = this.eventStorage.getBatch()
    // TODO contingency when events could not be posted
    await postJSON(
      `${this.endpoint}api/events`,
      events
    )
  }

}