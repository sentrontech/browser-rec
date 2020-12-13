import { EmittedEvent } from '../types'

export default class EventStorage {
  private events: EmittedEvent[] = []

  append = (e: EmittedEvent) => {
    this.events.push(e)
  }

  getBatch = () => {
    const events = this.events
    this.events = []
    return events
  }
}