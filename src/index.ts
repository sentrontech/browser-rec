import Emitter from './emitter'
import EventPublisher from './event/publisher'
import EventStorage from './event/storage'
import Recorder from './record'
import { StartOpts } from './types'
import { getDefaultOpts, version } from './utils'

const start = (startOpts: StartOpts) => {
  /*
    NOTE: Some base checks here have been omitted 
    1. Check if Sentron has already been loaded
    2. Check if `document.readyState` is complete
    3. If not (2) then addEventListener to call `start` when the document is ready
  */
  const opts = getDefaultOpts(startOpts)
  const eventStorage = new EventStorage()
  const emitter = new Emitter(eventStorage)
  const recorder = new Recorder(opts, emitter)
  const eventPublisher = new EventPublisher(opts, eventStorage, recorder)

  emitter.start()
  recorder.start()
  eventPublisher.start()
}

export { start, version }
