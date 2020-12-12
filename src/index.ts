import getEmitterInstance from './emitter'
import EventPublisher from './event/publisher'
import EventStorage from './event/storage'
import record from './record'
import { StartOpts } from './types'

const start = (opts: StartOpts) => {
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