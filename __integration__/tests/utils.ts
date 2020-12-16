declare global {
  namespace jest {
    interface Matchers<R> {
      toBeWithinRange(floor: number, ceiling: number): CustomMatcherResult
    }
  }
}

expect.extend({
  toBeWithinRange(received, floor, ceiling) {
    const pass = received >= floor && received <= ceiling
    return {
      message: () => `expected ${received} to be within range ${floor} - ${ceiling}`,
      pass
    }
  }
})

export const hostname = 'http://localhost:9999/'