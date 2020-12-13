const hostname = 'http://localhost:9999/'

describe('recording clicks', () => {
  test('it records', async () => {
    await page.goto(`${hostname}template/button`)
    await page.click('#inert-btn')
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON()
    const out = [
      {
        data: {
          cssPath: '#inert-btn',
          x: 50,
          y: 18
        },
        eventType: 'sentron.dom.click',
        ts: expect.any(Number)
      }
    ]
    expect(postData).toEqual(out)
  })

  test('it records multiple clicks', async () => {
    await page.goto(`${hostname}template/button`)
    await page.click('#inert-btn')
    await page.click('#inert-btn')
    await page.click('#inert-btn')
    const request = await page.waitForRequest('**/api/events')
    const postData = JSON.parse(request.postData() as string) as Object[]
    console.log('pd', postData)
    console.log('pd length', postData.length)
    expect(postData.length).toBe(3)  
  })

  test('it records x and y', async () => {
    await page.goto(`${hostname}template/button`)
    await page.mouse.click(150, 20)
    const request = await page.waitForRequest('**/api/events')
    const postData = request.postDataJSON()
    const out = [
      {
        data: {
          cssPath: 'body',
          x: 150,
          y: 20
        },
        eventType: 'sentron.dom.click',
        ts: expect.any(Number)
      }
    ]
    expect(postData).toEqual(out)  
  })
})
