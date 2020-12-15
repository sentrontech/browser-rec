import Emitter from './emitter'
import EventPublisher from './event/publisher'
import EventStorage from './event/storage'
import recordClicks from './record/click'
import recordConsole from './record/console'
import recordInputs from './record/input'
import { StartOpts } from './types'

const start = (opts: StartOpts) => {
  // Note: Some base checks here have been omitted 
  // 1. Check if Sentron has already been loaded
  // 2. Check if `document.readyState` is complete
  // 3. If not (2) then addEventListener to call `start` when the document is ready
  const eventStorage = new EventStorage()
  const eventPublisher = new EventPublisher(opts, eventStorage)
  const emitter = new Emitter(eventStorage)

  emitter.start()
  eventPublisher.start()

  recordClicks(emitter)
  recordInputs(emitter, opts)
  recordConsole(emitter)
}

export {
  start
}