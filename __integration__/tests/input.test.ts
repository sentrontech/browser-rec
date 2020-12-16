import { ClickEvent, EventsDto } from '../../src/types'
import { hostname } from './utils'

describe('recording inputs', () => {
  beforeEach(async () => {
    await jestPlaywright.resetPage()
  })

  it('records', async () => {
    await page.goto(`${hostname}template/input`)
    await page.fill('#text', '1')
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    const events = [
      {
        data: {
          type: 'text',
          value: '1'
        },
        eventType: 'sentron.dom.input',
        ts: expect.any(Number),
        seqNo: 1
      }
    ]
    expect(postData).toEqual({ events })
  })

  it('records multiple input events', async () => {
    await page.goto(`${hostname}template/input`)
    // NOTE: `await page.fill('#text', '123')` triggers one input event with `123`
    await page.focus('#text')
    page.keyboard.type('123')
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    expect(postData.events.length).toBe(3)
  })

  it('does not record if blocked', async () => {
    /* 
      NOTE: We save all requests made on the page.
      Later we check if api/events is not in that list
      TODO: Check if using `waitForRequest` on `api/events` endpoint is
      a better way of doing this
    */
    const requests: string[] = []
    page.on('request', (request) => requests.push(request.url()))
    await page.goto(`${hostname}template/input`)
    await page.fill('#blocked', '123')
    // HACK: Assume request will not be made past a timeout
    await page.waitForTimeout(3000)
    expect(requests).not.toContain(`${hostname}api/events`)
  })

  it('does not record password inputs', async () => {
    const requests: string[] = []
    page.on('request', (request) => requests.push(request.url()))
    await page.goto(`${hostname}template/input`)
    await page.fill('#password', '123')
    // HACK: Assume request will not be made past a timeout
    await page.waitForTimeout(3000)
    expect(requests).not.toContain(`${hostname}api/events`)
  })
})
