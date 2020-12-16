import { ClickEvent, ConsoleMethod, EventsDto } from '../../src/types'
import './utils'

const hostname = 'http://localhost:9999/'

describe('recording console', () => {
  beforeEach(async () => {
    await jestPlaywright.resetPage()
  })

  it('records', async () => {
    await page.goto(`${hostname}template/console`)
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    const events = [
      {
        data: {
          method: ConsoleMethod.Log,
          args: ['a log message', 'with a second arg']
        },
        eventType: 'sentron.devtool.console',
        ts: expect.any(Number),
        seqNo: 1
      }
    ]
    expect(postData).toEqual({ events })
  })

  it('records multiple console methods after load', async () => {
    await page.goto(`${hostname}template/layout`)
    await page.evaluate(() => {
      console.debug('debug message')
      console.info('info message')
      console.warn('warn message')
      console.log('log message')
      console.error('error message')
    })
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    expect(postData.events.length).toBe(5)
  })
})
