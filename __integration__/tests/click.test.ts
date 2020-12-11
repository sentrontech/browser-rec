const hostname = 'http://localhost:9999/'

describe('recording clicks', () => {
  test('it records', async () => {
    await page.goto(`${hostname}template/button`)
    await page.click('#inert-btn')
    expect(await page.title()).toBe('yep')
  })
})
