import recordClicks from './click'
import recordConsole from './console'

export default {
  start() {
    recordClicks()
    recordConsole()
  }
}