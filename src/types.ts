import { Block } from 'typescript'

export enum EventType {
  /* Browser JS events 
    For example inputs, clicks, scrolls
    Scroll = 'sentron.dom.scroll',
  */
  Click = 'sentron.dom.click',
  Input = 'sentron.dom.input',

  /* Devtool events 
    For example network requests and console logs
    NetworkXhrRequest = 'sentron.devtool.network.xhr.request',
    NetworkXhrResponse = 'sentron.devtool.network.xhr.response',
  */
  Console = 'sentron.devtool.console'
}

export type RecordConfig = {
  clientCode: string
  endpoint?: string
}

export type EmittedEvent = ConsoleEvent | ClickEvent | InputChangeEvent

type BaseEvent = {
  eventType: EventType
  ts?: number
  seqNo?: number
}

export enum ConsoleMethod {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error',
  Log = 'log'
}
export type ConsoleEvent = {
  data: {
    method: ConsoleMethod
    args: any[]
  }
} & BaseEvent

export type ClickEvent = {
  data: {
    cssPath: string
    x: number
    y: number
  }
} & BaseEvent

export type InputChangeEvent = {
  data: {
    type: string
    value: string
  }
} & BaseEvent

export type EventsDto = {
  events: EmittedEvent[]
}

export type EventListenerOpts = {
  passive?: boolean
  capture?: boolean
}

export type BlockedOpts = {
  classes?: string[]
  tags?: string[]
}

export type StartOpts = {
  clientCode: string
  endpoint: string
  pollMs?: number
  blocked?: BlockedOpts
}

export type Opts = Required<StartOpts>

export type ListenedEvt<E extends Event> = {
  event: string
  fn: (evt: E) => void
  target: Document
  opts: EventListenerOpts
}

export type Resetable = { reset(): void } | undefined
