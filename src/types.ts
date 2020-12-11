export enum EventType {
  /* Browser JS events 
    For example inputs, clicks, scrolls
    Scroll = 'sentron.dom.scroll',
  */
  Click = 'sentron.dom.click',

  /* Devtool events 
    For example network requests and console logs
    NetworkXhrRequest = 'sentron.devtool.network.xhr.request',
    NetworkXhrResponse = 'sentron.devtool.network.xhr.response',
  */
  Console = 'sentron.devtool.console'
}

export type RecordConfig = {
  clientCode: string,
  endpoint?: string
}

export type ConsoleEvent = {
  type: EventType.Console
  data: {
    msg: string
  }
}

export type ClickEvent = {
  type: EventType.Click
  el: HTMLElement,
  data: {
    x: number,
    y: number
  }
}

export type EventOpts = {
  passive?: boolean
  capture?: boolean
}