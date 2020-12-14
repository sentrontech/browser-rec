import recordClicks from './click'
import recordInputs from './input'
import recordConsole from './console'

export default {
  start() {
    recordClicks()
    recordInputs()
    recordConsole()
  }
}