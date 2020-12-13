import { EmittedEvent } from "../types"

export async function postJSON(
  url: string,
  body?: EmittedEvent[],
  headers?: Headers
) {
  const options: RequestInit = {
    method: 'POST',
    headers: headers || getHeaders(),
    body: JSON.stringify(body)
  }

  const resp = await fetch(url, options)
  const data = await resp.json()
  if (resp.ok) return data
  if (data.error) throw Object.assign(new Error(), data.error)
  throw new Error('Unknown error')
}

const getHeaders = () => (
  new Headers({
    'Content-Type': 'application/json'
  })
)