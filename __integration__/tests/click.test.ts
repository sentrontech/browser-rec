import { ClickEvent, EventsDto } from '../../src/types'
import { hostname } from './utils'

describe('recording clicks', () => {
  beforeEach(async () => {
    await jestPlaywright.resetPage()
  })

  it('records', async () => {
    await page.goto(`${hostname}template/button`)
    await page.click('#inert-btn')
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    const events = [
      {
        data: {
          cssPath: '#inert-btn',
          x: expect.any(Number),
          y: expect.any(Number)
        },
        eventType: 'sentron.dom.click',
        ts: expect.any(Number),
        seqNo: 1
      }
    ]
    expect(postData).toEqual({ events })
    /* NOTE: 
      A range is used as various browsers click at slightly different pixel positions
      Perhaps another way would be to have a browser specific directory for tests or 
      to detect the browser with `browserName` and specify the values directly
      or to use normalise.css in the `layout.ejs`
    */
    expect((postData.events[0] as ClickEvent).data.x).toBeWithinRange(49, 66)
    expect((postData.events[0] as ClickEvent).data.y).toBeWithinRange(15, 24)
  })

  it('records multiple clicks', async () => {
    await page.goto(`${hostname}template/button`)
    await page.click('#inert-btn')
    await page.click('#inert-btn')
    await page.click('#inert-btn')
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    expect(postData.events.length).toBe(3)
  })

  it('records x and y', async () => {
    await page.goto(`${hostname}template/button`)
    await page.mouse.click(150, 20)
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON() as EventsDto
    const events = [
      {
        data: {
          cssPath: 'body',
          x: 150,
          y: 20
        },
        eventType: 'sentron.dom.click',
        ts: expect.any(Number),
        seqNo: 1
      }
    ]
    expect(postData).toEqual({ events })
  })
})
