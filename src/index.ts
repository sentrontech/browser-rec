import getEmitterInstance from './emitter'
import EventPublisher from './event/publisher'
import EventStorage from './event/storage'
import record from './record'
import { StartOpts } from './types'

const start = (opts: StartOpts) => {
  // TODO blocked input
  // TODO get text of the element
  // TODO Publisher retry questions (???) - endpoint down, latency spike, > retry timer
  // Why singleton // mocks
  const eventStorage = new EventStorage()
  const eventPublisher = new EventPublisher(opts.endpoint, eventStorage)
  const eventEmitter = getEmitterInstance(opts, eventStorage)
  eventEmitter.start()
  record.start()
  eventPublisher.start()
}

export {
  start
}