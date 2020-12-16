import { EventType } from '../../types'
import EventStorage from '../storage'

describe('EventStorage', () => {
  it('gets batches', () => {
    const eventStorage = new EventStorage()
    eventStorage.append(anEvent)
    eventStorage.append(anEvent)
    const batch = eventStorage.getBatch()
    expect(batch).toEqual([anEvent, anEvent])
  })

  it('clears events after returning batch', () => {
    const eventStorage = new EventStorage()
    eventStorage.append(anEvent)
    eventStorage.append(anEvent)
    eventStorage.getBatch() // first batch
    const secondBatch = eventStorage.getBatch()
    expect(secondBatch).toEqual([])
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
